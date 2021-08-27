import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Machine } from 'src/Models/Machine';
import { NewMachineComponent } from './components/new-machine/new-machine.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('modalNewMachine') modalNewMachine: NewMachineComponent;

  machines: Machine[] = [];
  commandMultiple: number = 1;

  constructor(){}

  calcHeight(){
    if (this.machines.length > 2) { return '43vh'; }
    else { return '87vh'; }
  }

  removeConsoleByIndex(i){
    this.machines.splice(i, 1);
  }

  newMachine(machine){
    this.machines.push({name: machine.nameMachine, ip: `${machine.ip}:${machine.port}`});
  }

  multipleCommand(config){
    this.commandMultiple++ ;
  }
}
