import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Machine } from 'src/Models/Machine';
import { MultipleCommandComponent } from './components/multiple-command/multiple-command.component';
import { NewMachineComponent } from './components/new-machine/new-machine.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('modalNewMachine') modalNewMachine: NewMachineComponent;
  @ViewChild('modalMultiCommand') modalMultiCommand: MultipleCommandComponent;

  machines: Machine[] = [];
  commandMultiple: any;

  constructor(){}

  ngOnInit(){
    this.getStartMachines();
  }

  calcHeight(){
    if (this.machines.length > 2) { return '43vh'; }
    else { return '87vh'; }
  }

  removeConsoleByIndex(i){
    this.machines.splice(i, 1);
    localStorage.setItem('machines', JSON.stringify(this.machines));
  }

  newMachine(machine){
    this.machines.push({name: machine.nameMachine, ip: `${machine.ip}:${machine.port}`});
    localStorage.setItem('machines', JSON.stringify(this.machines));
  }

  multipleCommand(config){
    this.commandMultiple = config;
  }

  getStartMachines(){
    const localMachines = localStorage.getItem('machines');
    if (localMachines !== undefined) { this.machines = JSON.parse(localMachines); }
  }
}
