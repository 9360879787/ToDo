import { HttpClient } from "@angular/common/http";
import { Component, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";

declare const google:any;

@Component({
  selector:'app-login',
  templateUrl:'./login.component.html'
})
export class LoginComponent implements AfterViewInit {

  constructor(private http: HttpClient,private router: Router) {}

  ngAfterViewInit(): void {

    if (typeof google !== 'undefined') {

      google.accounts.id.initialize({
        client_id:'271579416782-249cq1ltjtrn49ir9i96qcqe0iggb8s0.apps.googleusercontent.com',

        callback:(response:any) => {
          this.handleLogin(response);
        }
      });

      google.accounts.id.renderButton(
        document.getElementById('google-btn'),
        {
          theme:'outline',
          size:'large'
        }
      );

    } else {
      console.log("Google SDK failed to load");
    }
  }

  handleLogin(response:any) {

    console.log(response);

    this.http.post(
      'https://todobackend.onrender.com/login',
      {
        token: response.credential
      }

    ).subscribe((res:any) => {

      console.log(res);
      localStorage.setItem('access_token',res.access_token);
      localStorage.setItem('refresh_token',res.refresh_token);

      localStorage.setItem(
       'data',JSON.stringify(res)
      );
      this.router.navigate(['/home']);

    });
  }

  refresh(){
    this.http.post(
      'https://todobackend.onrender.com/refresh',{},{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
        }
      })
      
  }
}