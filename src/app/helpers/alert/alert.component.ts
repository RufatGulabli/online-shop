import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  @Input() message: string;
  @Input() status: string;
  @Input() url: string;

  constructor(
    public activeModal: NgbActiveModal,
    public router: Router
  ) { }

  close() {
    this.activeModal.close();
    this.router.navigateByUrl(this.url);
  }

}
