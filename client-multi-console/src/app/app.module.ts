import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WinConsoleComponent } from './components/win-console/win-console.component';
import { HttpClientModule } from '@angular/common/http';
import { Nl2bPipe } from './shared/nl2b.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewMachineComponent } from './components/new-machine/new-machine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultipleCommandComponent } from './components/multiple-command/multiple-command.component';

@NgModule({
  declarations: [
    AppComponent,
    WinConsoleComponent,
    Nl2bPipe,
    NewMachineComponent,
    MultipleCommandComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
