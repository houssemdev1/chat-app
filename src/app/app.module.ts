import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { PopComponent } from './pop/pop.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
const config: SocketIoConfig = { url: 'http://localhost:8010', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    PopComponent,
    
    LoginComponent,
    InscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    SocketIoModule.forRoot(config),
   
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
