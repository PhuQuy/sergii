import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comfirmation-modal',
  templateUrl: './comfirmation-modal.component.html',
  styleUrls: ['./comfirmation-modal.component.css']
})
export class ComfirmationModalComponent {
  public title: string;
  public message: string;
  constructor(public activeModal: NgbActiveModal) { }

}
