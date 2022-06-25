import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Images } from '@nike-core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shell';
  images = Images
  window = window;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private cha: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    if (!!localStorage.getItem('user')) {
      this.router.navigate(['orders/products']);
    }
  }

  authAction(): void {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    } else {
      const dialogRef = this.dialog.open(LogoutDialogComponent, {
        panelClass: 'logout-dialog-panel',
        position: {
          top: '76px'
        }
      });
      dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
        if (res) {
          this.logout();
        }
      })

    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getAuthText(): string {
    return this.isLoggedIn() ? 'Logout' : 'Login';
  }
}
