import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';

import { AuthenticationService } from '@nike-core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  emailForm: FormControl = new FormControl(undefined, [Validators.required, Validators.minLength(4)]);
  nameForm: FormControl = new FormControl(undefined);
  showLoginError = false;
  shouldRegister = false;
  errorMessage = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private cha: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log('intra')
    this.cha.detectChanges();
  }

  login(): void {
    this.authenticate()
        .subscribe(courier => {
          if (courier) {
            localStorage.setItem('user', JSON.stringify(courier));
            this.router.navigate(['/orders']);
          } else {
            this.showError('Error while authenticating');
            this.shouldRegister = true;
          }
        })
  }

  authenticate(): Observable<any> {
    return !!this.nameForm.value ?
      this.authService.register(this.emailForm.value, this.nameForm.value).pipe(take(1))
      :
      this.authService.login(this.emailForm.value).pipe(take(1), map(res => res.courier));
  }

  showError(message: string): void {
    this.showLoginError = true;
    this.errorMessage = message;
    setTimeout(() => this.showLoginError = false, 3000);
  }

}
