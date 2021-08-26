import { Component, Input, OnInit } from '@angular/core';
import { WinListenerService } from 'src/app/service/win-listener.service';

@Component({
  selector: 'win-console',
  templateUrl: './win-console.component.html',
  styleUrls: ['./win-console.component.css']
})
export class WinConsoleComponent implements OnInit {
  @Input() ip: string;
  @Input() divScroll: any;
  @Input() index: any;

  offline: boolean = false;
  loading: boolean = true;

  messages = [];
  currentPath = '';

  constructor(private _service: WinListenerService){}

  ngOnInit() {
    this.connect();
  }

  setFocus() {
    document.getElementById(`text-input${this.index}`).focus();
    this.scrollToBottom();
  }

  submit(text, userInput) {
    this.messages.push(`${this.currentPath} ${text}`);
    this._service.getCommandByPath(this.ip, `"${this.currentPath}"`, text).then(x => {
      if(text.includes('cd') && x.result != null) this.currentPath = x.result;
      else if (x.result != null )this.messages.push(x.result);
      else this.messages.push(x.error);
      this.scrollToBottom();
    }).catch(ex => {console.log(ex), this.offline = true});
  }

  connect(){
    this.loading = true;
    this.messages = [];
    this._service.getInit(this.ip).then(x => {
      this.messages.push(x.value_init);
      this.currentPath = x.path;
      this.scrollToBottom();
      this.loading = false;
      this.offline = false; 
    }).catch(ex => {console.log(ex), this.offline = true, this.loading = false});
  }

  scrollToBottom() {
    setTimeout(
      () => {
        this.divScroll.scrollTop = this.divScroll.scrollHeight;
      },
      50
    );
  }

}
