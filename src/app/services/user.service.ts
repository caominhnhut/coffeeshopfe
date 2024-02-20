import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {

   }

  signup(data:any){
    return this.httpClient.post(this.url+"/users", data,{
      headers:new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  forgotPassword(data:any){
    return this.httpClient.post(this.url+"/users/forgot-password", data,{
      headers:new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  login(data:any){
    return this.httpClient.post(this.url+"/authenticate", data,{
      headers:new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  checkToken(){
    console.log("checking token")
    if (localStorage.getItem('token')){
      console.log("token is provided");
      return true;
    }
    console.log("checking isnot provided");
    return false;
  }
}
