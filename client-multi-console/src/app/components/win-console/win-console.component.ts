import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { WinListenerService } from 'src/app/service/win-listener.service';

@Component({
  selector: 'win-console',
  templateUrl: './win-console.component.html',
  styleUrls: ['./win-console.component.css']
})
export class WinConsoleComponent implements OnInit, OnChanges {
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

  ngOnChanges(changes: SimpleChanges){
    if(changes.ip == undefined) this.setCommandMultiple();
  }

  setCommandMultiple(){
    console.log(this.commandMultiple)
  }

  setFocus() {
    document.getElementById(`text-input${this.index}`).focus();
    this.scrollToBottom();
  }

  submit(text, userInput) {
    userInput.disabled = true;
    this.messages.push(`${this.currentPath}> ${text}`);
    this.service.getCommandByPath(this.ip, `"${this.currentPath}"`, text).then(x => {
      userInput.disabled = false;
      if (text.includes('cd') && x.result != null) { this.currentPath = x.result; }
      else if (x.result != null) { this.messages.push(x.result); }
      else { this.messages.push(x.error); }
      this.scrollToBottom();
      this.setFocus();
    }).catch(() => { userInput.disabled = false, this.offline = true; });
  }

  connect() {
    this.loading = true;
    this.messages = [];
    this.service.getInit(this.ip).then(x => {
      this.messages.push(x.value_init);
      this.currentPath = x.path;
      this.scrollToBottom();
      this.setToFocus();
      this.loading = false;
      this.offline = false;
    }).catch(() => { this.offline = true, this.loading = false; });
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
