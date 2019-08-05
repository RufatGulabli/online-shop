import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  form: FormGroup;
  error: string;

  private subscription = new Subscription();

  constructor(
    public loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  get Firstname() {
    return this.form.get('email');
  }

  get Lastname() {
    return this.form.get('password');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  onSubmit() {
    this.loginService.signup(this.form.value).subscribe(
      token => {
        localStorage.setItem('token', token);
        const returnUrl = this.activatedRoute.snapshot.queryParamMap.get(
          'returnUrl'
        );
        this.router.navigate([returnUrl || '/']);
      },
      err => {
        this.error = err.error.body;
      }
    );
  }

  emailValidation() {
    return this.form.get('email').hasError('required')
      ? 'Email is required'
      : this.form.get('email').hasError('email')
        ? 'Not a valid email'
        : '';
  }
  passwordValidation() {
    return this.form.get('password').hasError('required')
      ? 'Password is required'
      : this.form.get('password').hasError('minlength')
        ? 'Minimum length must be at least 8 symbols'
        : '';
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
