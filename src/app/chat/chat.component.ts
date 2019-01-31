import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Socket } from 'ngx-socket-io';
/* creation objet */
interface ChatsInterface {
  user: String;
  chat: String;
  ladate;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  
  title = 'ChatAngular6';
  today: number = Date.now();
  msgtxt: String;
  msg: String;
  ladate: String;
  user: String;
  newuser: any;
  users$: []


  constructor(private socket: Socket, private data:DataService, config: NgbModalConfig) {

    config.backdrop = 'static';
    config.keyboard = false;
    // this.modalService.open(this.content);
  }

  // ngAfterViewInit() {
  //   this.modalService.open(this.content);



  // }





  ngOnInit() {
    this.getUsers()
    this.data.getnewuser().subscribe(res3 => {
      this.newuser = res3;
      console.log('this newuser', res3);
    });

    this.data.getMessages().subscribe((res2:any) => {
      this.msg = res2.reverse;
    });
    this.data.getMessage().subscribe(res => {
      // get all message from api
      this.data.getMessages().subscribe((res2:any) => {
        this.msg = res2.reverse;
      });
    });
  }

  sendMessage() {

    console.log('sendMessage-> nickname', this.data.nickname.value);
    const chatInter = {
      user: this.data.nickname.value,
      chat: this.msgtxt,
      ladate: Date.now()
    };
    this.data.insertMessage(chatInter);

  }
  /*open(content) {
      this.modalService.open(content);
    }*/

  join() {
   
    this.data.joinChat({ user: this.data.nickname.value });

    console.log('user add', this.data.nickname.value);
  }

  getUsers(){
    return this.data.getAllusers().subscribe((res:any)=>{
  this.users$=res.result
  console.log(this.users$)
    })}
}
