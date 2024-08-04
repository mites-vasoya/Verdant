import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'verdant';

  apiKey: string = '1b983230-7f6b-401e-80d7-31334b741f6a';

  navigateToUpstoxLogin() {
    window.open(`https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${this.apiKey}&redirect_uri=%3C%3E`, "_self");
  }
}
