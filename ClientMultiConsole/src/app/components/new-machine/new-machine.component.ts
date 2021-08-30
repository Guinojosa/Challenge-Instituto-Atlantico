import { Component, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewMachineValidator } from 'src/app/shared/Validators/new-machine.validator';
import { Machine } from 'src/Models/Machine';

@Component({
  selector: 'new-machine',
  templateUrl: './new-machine.component.html',
  styleUrls: ['./new-machine.component.css']
})
export class NewMachineComponent {
  @ViewChild('contentNewMachine') content: any;
  @Input() machines: Machine[] = [];
  @Output() newMachineOut = new EventEmitter<any>();
  formMachine: FormGroup;
  constructor(private modalService: NgbModal, private fb: FormBuilder) { }
  open() {
    this.formMachine = this.fb.group({
      nameMachine: ['', [Validators.required, NewMachineValidator.nameExistValidate(this.machines)]],
      ip: ['', Validators.required],
      port: ['5050', Validators.required]
    });
    this.modalService.open(this.content);
  }
  newMachine(){
    this.newMachineOut.emit(this.formMachine.value);
    this.modalService.dismissAll();
  }

}
