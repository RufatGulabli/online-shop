import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { timer } from "rxjs";

@Component({
  selector: "app-no-access",
  templateUrl: "./no-access.component.html",
  styleUrls: ["./no-access.component.css"]
})
export class NoAccessComponent implements OnInit {
  constructor(private router: Router) {}
  elapsedTime: number;

  ngOnInit() {
    let myObservable = timer(0, 1000);
    myObservable.subscribe(seconds => (this.elapsedTime = 3 - seconds));
    setTimeout(() => {
      this.router.navigate(["/"]);
    }, 3000);
  }
}
