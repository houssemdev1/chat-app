import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class DataService {


  nickname: BehaviorSubject<any> = new BehaviorSubject('');
  constructor(private http: HttpClient, private socket: Socket) {

   }
  getMessages() {

    return this.http.get('http://localhost:8010/chats');

  }


  getnewuser() {
        return this.socket
          .fromEvent('broadcast');
      }
//affichage des users
getAllusers(){
  return this.http.get('http://localhost:8010/allusers')
}

      getMessage() {
        return this.socket
          .fromEvent('chat');

      }
  /*insertion message + user*/
  insertMessage(data) {
    this.http.post('http://localhost:8010/chats', data)
      .subscribe(
        res => {
          console.log('Success', res);
        },
        err => {
          console.log('Error occured:', err);
        }
      );

  }

  userRegister(datas) {
    console.log('register ==>', datas);
    return this.http.post('http://localhost:8010/userRegister', datas);
  }
  //verifier login
  verifLogin(datas){
    return this.http.post('http://localhost:8010/veriflogin', datas);
  }
  joinChat(data2) {
      this.socket.emit('join', data2);
      console.log('joinchatdata2', data2);

  }
}
