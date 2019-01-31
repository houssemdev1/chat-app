import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';
@Component({
  selector: 'app-dialog',
  template: `
  <div class="modal-header">
  <h4 class="modal-title"> Chat !</h4>
  </div>
  <div class="modal-body">
  <input class="form-control" id="ex3" type="text" placeholder="Put Name" [(ngModel)]="name">
   </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click'); senduser()">Join</button>

  </div>
  `
})

// tslint:disable-next-line:component-class-suffix
export class NgbdModalContent {
  @Input() name = '';
  constructor(public activeModal: NgbActiveModal, private data: DataService) { }
 senduser() {
     this.data.nickname.next(this.name);
  }
}
@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.css']
})
export class PopComponent implements OnInit  , AfterViewInit{

  pseudo: String;
  modalRef;
  constructor(private modalService: NgbModal, private data: DataService) { }
  open() {
    this.modalRef = this.modalService.open(NgbdModalContent);
    // modalRef.componentInstance.name = 'World';
  }
  ngOnInit() {
   /*this.chatService.nickname.subscribe(val => console.log(val));*/
  }

  ngAfterViewInit() {

    this.open();
  }
}
