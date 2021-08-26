import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ips = ['localhost:5050']

  calcHeight(){
    if(this.ips.length > 1) return '43vh'
    else return '89vh'
  }

  removeIp(ip){
    this.ips = this.ips.filter(x => x != ip);
  }
}
