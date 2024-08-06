import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'verdant';

  apiKey: string = '1b983230-7f6b-401e-80d7-31334b741f6a';
  redirectUrl: string = "https://verdant-flame.vercel.app/redirect";

  navigateToUpstoxLogin() {
    window.open("https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=" + this.apiKey + "&redirect_uri=" + this.redirectUrl, "_self");
  }
}
