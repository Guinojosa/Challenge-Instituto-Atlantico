import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'new-machine',
  templateUrl: './new-machine.component.html',
  styleUrls: ['./new-machine.component.css']
})
export class NewMachineComponent {
  @ViewChild('contentNewMachine') content: any;
  @Output() newMachineOut = new EventEmitter<any>()
  formMachine: FormGroup;
  constructor(private modalService: NgbModal, private fb: FormBuilder) { }
  open() {
    this.formMachine = this.fb.group({
      nameMachine: ['', Validators.required],
      ip: ['',Validators.required],
      port: ['5050', Validators.required]
    })
    this.modalService.open(this.content);
  }
  newMachine(){
    this.newMachineOut.emit(this.formMachine.value);
    this.modalService.dismissAll();
  }

}
