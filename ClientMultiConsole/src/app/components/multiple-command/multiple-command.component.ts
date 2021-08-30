import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalAlertService } from 'src/app/shared/Alerts/swal-alert.service';
import { MultipleCommandValidator } from 'src/app/shared/Validators/multiple-command.validator';
import { Machine } from 'src/Models/Machine';

@Component({
  selector: 'multiple-command',
  templateUrl: './multiple-command.component.html',
  styleUrls: ['./multiple-command.component.css']
})
export class MultipleCommandComponent {
  @ViewChild('contentMultiCommand') content: any;
  @Output() newMultiCommand = new EventEmitter<any>();
  @Input() machines: Machine[] = [];
  formMultiCommand: FormGroup;
  constructor(private modalService: NgbModal, private fb: FormBuilder, private alertService: SwalAlertService) { }
  open() {
    if (this.machines.length === 0) {
      this.alertService.swalAlert('Erro ao abrir Multi Comando', 'Você não possui nenhuma maquina registrada para executar essa opção.', 'error');
    }
    else {
      this.formMultiCommand = this.fb.group({
        machines: this.addMachinesForm(),
        command: ['', Validators.required]
      });
      this.modalService.open(this.content);
    }
  }

  submitMultiCommand() {
    this.newMultiCommand.emit(this.formMultiCommand.value);
    this.modalService.dismissAll();
  }

  addMachinesForm() {
    const machinesForm = this.fb.array([], MultipleCommandValidator.multiMachineValidate);
    this.machines.forEach((machine, index) => {
      machinesForm.push(
        this.fb.group({
          name: [machine.name],
          index: [index],
          execute: [false]
        })
      );
    });
    return machinesForm;
  }

}
