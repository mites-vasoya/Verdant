import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'verdant';

  apiKey: string = '1b983230-7f6b-401e-80d7-31334b741f6a';
  redirectUrl: string = "http://localhost:4200/redirect";

  navigateToUpstoxLogin() {
    let url: string = "https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=" + this.apiKey + "&redirect_uri=" + this.redirectUrl;
    console.log("url : ", url);
    window.open(url, "_self");
  }
}
