import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../shared/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private modalService: NgbModal) { }

  showAlert(message: string, status: string, url?: string) {
    const modalRef = this.modalService.open(
      AlertComponent,
      {
        centered: true,
        size: 'sm',
        backdrop: 'static'
      }
    );
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.status = status;
    if (url) {
      modalRef.componentInstance.url = url;
    }
  }
}
