import { LoginService } from '../../../services/login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });
  public error;

  private subscription = new Subscription();

  constructor(
    public loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() { }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
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

  onSubmit() {
    this.subscription.add(
      this.loginService.login(this.form.value).subscribe(() => {
        const queryObject: QueryObject = {} as QueryObject;
        queryObject.returnUrl = this.activatedRoute.snapshot.queryParamMap.get(
          'returnUrl'
        );
        queryObject.address = JSON.parse(this.activatedRoute.snapshot.queryParamMap.get(
          'address'
        ));
        if (queryObject.returnUrl === '/check-out') {
          this.router.navigate([queryObject.returnUrl || '/'],
            {
              queryParams:
                { address: JSON.stringify(queryObject.address) }
            });
        } else {
          this.router.navigate([queryObject.returnUrl || '/']);
        }
      },
        (err: HttpErrorResponse) => {
          this.error = err.error.body;
        }
      ));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}

interface QueryObject {
  returnUrl: string;
  address: {
    name: string;
    address1: string;
    city: string;
    address2?: string;
  };
}
