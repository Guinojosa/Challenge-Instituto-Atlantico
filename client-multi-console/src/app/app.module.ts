import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WinConsoleComponent } from './components/win-console/win-console.component';
import { HttpClientModule } from '@angular/common/http';
import { Nl2bPipe } from './shared/nl2b.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WinConsoleComponent,
    Nl2bPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
