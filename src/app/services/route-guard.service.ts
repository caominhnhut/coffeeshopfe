import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { GlobalConstants } from '../shared/global-constrants';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(private auth:AuthService,
    private route:Router,
    private snackBarService: SnackbarService) { }

  canActivate(router:ActivatedRouteSnapshot):boolean{
    let expectedRoleArray = router.data;
    expectedRoleArray = expectedRoleArray.expectedRole;
    console.log("expectedRoleArray: ", expectedRoleArray);
    const token:any = localStorage.getItem('token' );
    
    var tokenPayload:any;
    try{
      tokenPayload = jwtDecode(token);
      console.log("tokenPayload: ", tokenPayload);
    }catch(error){
      localStorage.clear();
      console.log("error when parsing tokenPayload: ", error);
      this.route.navigate(['/']);
    }

    if(tokenPayload.roles.indexOf(expectedRoleArray[0]) || tokenPayload.roles.indexOf(expectedRoleArray[1])){
      console.log("the roles are expected");
      if(this.auth.isAuthenticated()){
        return true;
      }
      console.log("The role is not authenticated");
      this.snackBarService.openSnackBar(GlobalConstants.unauthorized, GlobalConstants.error);
      this.route.navigate(['/'])
      return false;
    }else{
      console.log("the roles are not expected");
      this.route.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }
}
