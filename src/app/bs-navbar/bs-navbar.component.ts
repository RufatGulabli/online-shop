import { LoginService } from "./../services/login.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"]
})
export class BsNavbarComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  logOut() {
    localStorage.removeItem("Token");
    this.router.navigate(["/"]);
  }
}
