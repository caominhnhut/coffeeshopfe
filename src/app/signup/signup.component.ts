import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constrants';
import { error } from 'console';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  password = true;
  confirmpassword = true;
  signupForm:any = FormGroup;
  responseMessage: any;

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    private snackbarService: SnackbarService,
    public dialogRef:MatDialogRef<SignupComponent>,
    private ngxService:NgxUiLoaderService
    ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName:[null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      lastName:[null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password:[null, [Validators.required]],
      confirmedPassword:[null, [Validators.required]],
    })
  }

  validateSubmit(){
    return this.signupForm.controls['password'].value != this.signupForm.controls['confirmedPassword'].value
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmedPassword: formData.confirmedPassword,
    }

    this.userService.signup(data).subscribe((response:any) => {
      console.log("response from creating data: ", response);
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = response?.data;
      this.snackbarService.openSnackBar(this.responseMessage,"");
      this.router.navigate(['/']);
    },(error) => {
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
}
