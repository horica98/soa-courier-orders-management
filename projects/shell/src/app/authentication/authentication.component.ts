import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';

import { AuthenticationService, AuthUser, MessageType, User } from '@nike-core';
import { SnackbarService } from '../../../../../libs/nike-core/src/lib/services/snackbar.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  registerControl: FormControl = new FormControl(false);
  registerForm: FormGroup | null;
  loginForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private cha: ChangeDetectorRef,
    private snackbar: SnackbarService
  ) {
  }

  ngOnInit(): void {
    this.cha.detectChanges();
    this.initializeLoginForm();
    this.registerControl.valueChanges.pipe().subscribe(res => res ? this.initializeRegisterForm() : this.deleteRegisterForm());
  }

  initializeLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  deleteRegisterForm(): void {
    this.registerForm = null;
  }

  initializeRegisterForm(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required, Validators.minLength(3)]),
      street: new FormControl('', [Validators.required, Validators.minLength(3)]),
      zipCode: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.registerForm.valueChanges.pipe().subscribe(res => console.log(this.registerForm));

  }

  login(): void {
    if (this.loginForm.valid) {
      const user: AuthUser = {...this.loginForm.value};
      console.log(user);
      this.authService.login(user)
        .pipe(
          take(1),
          map(res => res.user)
        ).subscribe((user: User | null) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.snackbar.open('Logged in.', MessageType.SUCCESS);
          this.router.navigate(['/orders/products']);
        } else {
          this.snackbar.open('Unexisting user. Please register', MessageType.ERROR);
          this.registerControl.setValue(true);
        }
      }, () => this.snackbar.open('Unsuccessful login. Try again.', MessageType.ERROR));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  authenticate(): void {
    this.registerControl.value ? this.register() : this.login();
  }

  register(): void {
    if (this.registerForm?.valid) {
      const user: User = {...this.registerForm.value, ...this.loginForm.value};
      console.log(user);
      this.authService.register(user).pipe(take(1)).subscribe(res => {
        user.id = res.id;
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/orders/products']);
        this.snackbar.open('Registered successfully.', MessageType.SUCCESS);
      })
    } else {
      this.loginForm.markAllAsTouched();
      this.registerForm?.markAllAsTouched();
    }
  }
}
