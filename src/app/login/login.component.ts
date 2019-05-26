import { LoginService } from "./../services/login.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ])
  });
  private error;

  constructor(
    public loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  get email() {
    return this.form.get("email");
  }

  get password() {
    return this.form.get("password");
  }

  emailValidation() {
    return this.form.get("email").hasError("required")
      ? "Email is required"
      : this.form.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }
  passwordValidation() {
    return this.form.get("password").hasError("required")
      ? "Password is required"
      : this.form.get("password").hasError("minlength")
      ? "Minimum length must be at least 8 symbols"
      : "";
  }

  onSubmit() {
    this.loginService.login(this.form.value).subscribe(
      res => {
        localStorage.setItem("Token", res);
        const returnUrl = this.activatedRoute.snapshot.queryParamMap.get(
          "returnUrl"
        );
        if (res) this.router.navigate([returnUrl || "/"]);
      },
      (err: HttpErrorResponse) => {
        this.error = err.error.body;
      }
    );
  }
}
