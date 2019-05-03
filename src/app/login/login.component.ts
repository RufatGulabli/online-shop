import { LoginService } from "./../services/login.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";

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

  constructor(public loginService: LoginService) {}

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
    this.loginService.login("").subscribe(result => {
      console.log(result);
    });
  }
}
