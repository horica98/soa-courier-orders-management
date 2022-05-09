import { ChangeDetectorRef, Component, Inject, NgZone, OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { InjectionTokens, Product, ProductService } from '@nike-core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  products: Product[] = [];
// TODO: EXTRACT PRODUCTS PAGE INTO DIFFERENT APP
  expanded = false;
  avatar: any;

  constructor(
    @Inject(InjectionTokens.ProductService) private productService: ProductService,
    private router: Router,
    private platform: Platform,
    private cha: ChangeDetectorRef,
    private androidPermissions: AndroidPermissions
  ) { }

  ngOnInit(): void {
    this.cha.detectChanges();
    this.productService.getProducts()
      .pipe(take(1))
      .subscribe(products => this.products = products);
  }

  goToProductDetails(): void {
    this.router.navigate([`/orders/products/1`]);
  }

  get isHybrid(): boolean {
    return this.platform.ANDROID || this.platform.IOS;
  }

  async takePicture() {
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

  openRequestInfoDialog() {
    console.log('open dialog')
  }

  async openCameraOrGallery(): Promise<void> {
    try {
      const imageData = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.DataUrl
      });
      console.log('imageData', imageData)
      this.avatar = imageData.dataUrl;
      // this.avatar = this.dataUrltoFile(imageData.dataUrl, 'avatar.png', 'png');
      console.log(this.avatar);
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

  deletePhoto() {
    console.log('deletePhoto');
    this.avatar = null;
    setTimeout(() => this.cha.detectChanges(), 500);
  }
}
