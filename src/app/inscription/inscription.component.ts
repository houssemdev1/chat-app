import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  formregister: FormGroup;
  user$: [];
  admin$: [];


  constructor(private data: DataService, private router: Router, private fb: FormBuilder) {
    this.formregister = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      userLastname: ['', [Validators.required, Validators.minLength(4)]],
      userEmail: ['', [Validators.required, Validators.minLength(8)]],
      userPassword: ['', [Validators.required, Validators.email, Validators.minLength(8)]],
    
    });




  }

  ngOnInit() {
  }
  register() {

    this.data.userRegister(this.formregister.value).subscribe(res => {
      console.log('register respone ==>', res);
      this.router.navigate(['login']);
    })
  }

}
