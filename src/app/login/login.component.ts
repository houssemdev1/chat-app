import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formlogin: FormGroup;
  resToken: any;
  constructor(private fb: FormBuilder, private router: Router, private data: DataService) {
    this.formlogin = this.fb.group({
      userEmail: ['', [Validators.required, Validators.minLength(4)]],
      userPassword: ['', [Validators.required, Validators.minLength(4)]],

    });
  }

  ngOnInit() {
  }
 
  //fonction de verification mot de passe
  verif() {
    localStorage.setItem("iduser", this.formlogin.value.userEmail);
    return this.data.verifLogin(this.formlogin.value).subscribe((res: any) => {
      console.log("login", res);
      if ((res.messg)==='exist')
      {
        localStorage.setItem('result',res.result._id);
      
   
 
         this.router.navigate(['chat'])
   
      }

    else  if (res.messg === "not exist")
        alert("verifier votre email ou votre mot de passe")
    else
    {
   alert("verifier votre mot de passe")
      }
      }
    )
  }
}
