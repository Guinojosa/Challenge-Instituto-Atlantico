import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-multi-console';
  ips = ['localhost:5050', 'localhost:5050','localhost:5050', 'localhost:5050']
}
