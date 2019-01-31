import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {path : 'chat',component: ChatComponent},
  {path : 'login', component: LoginComponent },
  {path : 'register', component: InscriptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 