import { ChangeDetectorRef, Component, Inject, NgZone, OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { take } from 'rxjs';

import { Camera, CameraResultType } from '@capacitor/camera';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { InjectionTokens, Product, ProductService } from '@nike-core';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  products: Product[] = [];
  expanded = false;
  avatar: any;
  window = window;
  searchControl: FormControl;
  private file: File | undefined;
  imageSearchProductName: string;

  constructor(
    @Inject(InjectionTokens.ProductService) private productService: ProductService,
    private router: Router,
    private platform: Platform,
    private cha: ChangeDetectorRef,
    private androidPermissions: AndroidPermissions
  ) { }

  ngOnInit(): void {
    this.cha.detectChanges();
    this.searchControl = new FormControl(undefined);
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .pipe(take(1))
      .subscribe(products => {
        this.products = products?.products;
        this.cha.detectChanges();
      });
  }

  goToProductDetails(product: Product): void {
    this.router.navigate([`/orders/products/${product.id}`]);
  }

  get isHybrid(): boolean {
    return this.platform.ANDROID || this.platform.IOS;
  }

  async takePicture(): Promise<void> {
    if (this.isHybrid) {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        async result => {
          if (result.hasPermission) {
            await this.openCameraOrGallery();
          }
          else {
            await this.openRequestInfoDialog();
          }
        }
      );
    } else {
      // Camera.getPhoto();
      await this.openCameraOrGallery();
    }
  }

  openRequestInfoDialog(): void {
    console.log('open dialog')
  }

  async openCameraOrGallery(): Promise<void> {
    try {
      const imageData = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.DataUrl
      });
      // console.log('imageData', imageData)
      this.avatar = imageData.dataUrl;
      this.file = this.dataUrltoFile(imageData.dataUrl, 'file', 'png');
      // console.log('FILE', this.file);
      // console.log(this.avatar);
      // await this.saveProfileAvatar(this.avatar);
    } catch (error) {
      console.log('error')
      // await this.displayToastMessagesService.displayMessage('error', 'top', 'COURIER.DOCUMENTS.IMG_NO_SELECTION');
    }
  }

  dataUrltoFile(dataurl: any, filename: any, format: any) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return (new File([u8arr], filename, {type: format}));
  }

  deletePhoto(): void {
    console.log('deletePhoto');
    this.nullifySearchFields();
    setTimeout(() => this.cha.detectChanges(), 500);
  }

  search(): void {
    // console.log(this.avatar);
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file);
      this.productService.searchByPhoto(formData)
        .pipe(take(1))
        .subscribe(res => {
          console.log('res', res);
          this.imageSearchProductName = res.response;
          document.getElementById(res.response)?.scrollIntoView({behavior: 'smooth'});
        }, err => console.log(err));
      // return Promise.resolve(undefined);
    }
  }

  searchByText(): void {
    console.log(this.searchControl.value);
    if (!this.searchControl.value) {
      this.getProducts();
    } else {
      this.productService.searchByName(this.searchControl.value)
        .pipe(take(1))
        .subscribe(res => {
          this.products = res.products;
          console.log(this.products)
          this.nullifySearchFields();
          this.cha.detectChanges();
        })
    }
  }

  nullifySearchFields(): void {
    this.avatar = null;
    this.file = undefined;
    this.imageSearchProductName = '';
  }

  searchOnEnter(event: KeyboardEvent): void {
    console.log(event);
    if (event.keyCode === 13) {
      this.searchByText();
    }
  }
}
