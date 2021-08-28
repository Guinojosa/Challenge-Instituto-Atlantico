import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { WinListenerService } from 'src/app/service/win-listener.service';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'win-console',
  templateUrl: './win-console.component.html',
  styleUrls: ['./win-console.component.css']
})
export class WinConsoleComponent implements OnInit, OnChanges {
  @ViewChild('userInput') userInput: any;
  @Input() ip: string;
  @Input() divScroll: any;
  @Input() index: any;
  @Input() commandMultiple: any;

  @Output() removeConsoleByIndex = new EventEmitter<string>();

  offline = false;
  loading = true;

  messages: string[] = [];
  currentPath = '';

  constructor(private service: WinListenerService) { }

  ngOnInit() {
    this.connect();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ip === undefined) { this.setCommandMultiple(); }
  }

  setCommandMultiple() {
    const command = this.commandMultiple.command;
    const execute = this.commandMultiple.machines[this.index].execute;
    if (execute) {
      if (this.offline) {
        this.loading = true;
      }
      this.submit(command);
    }
  }

  setFocus() {
    document.getElementById(`text-input${this.index}`).focus();
    this.scrollToBottom();
  }

  submit(text) {
    this.disableInput(true);
    this.messages.push(`${this.currentPath}> ${text}`);
    this.service.getCommandByPath(this.ip, `"${this.currentPath}"`, text).then(x => {
      this.disableInput(false);
      if (text.includes('cd') && x.result != null) { this.currentPath = x.result; }
      else if (x.result != null) { this.messages.push(x.result); }
      else { this.messages.push(x.error); }
      this.scrollToBottom();
      this.setFocus();
      this.loading = false;
      this.offline = false;
    }).catch(() => { this.disableInput(false), this.offline = true, this.loading = false; });
  }

  connect() {
    this.loading = true;
    this.messages = [];
    this.service.getServerInfo(this.ip).then(x => {
      this.messages.push(x.value_init);
      this.currentPath = x.path;
      this.scrollToBottom();
      this.setToFocus();
      this.loading = false;
      this.offline = false;
    }).catch(() => { this.offline = true, this.loading = false; });
  }

  disableInput(bool) {
    if (this.userInput !== undefined) {
      this.userInput.disabled = bool;
    }
  }

  removeConsole() {
    this.removeConsoleByIndex.emit(this.index);
  }

  scrollToBottom() {
    setTimeout(
      () => {
        this.divScroll.scrollTop = this.divScroll.scrollHeight;
      },
      50
    );
  }

  setToFocus() {
    setTimeout(
      () => {
        this.setFocus();
      },
      50
    );
  }

}
