import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-redirected',
  templateUrl: './redirected.component.html',
  styleUrl: './redirected.component.css'
})
export class RedirectedComponent implements OnInit {

  private auth_code: string = "";
  public data: Object | any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log("Query params : ", params);
      this.auth_code = params['code'];
      console.log("this.auth_code : ", this.auth_code);

      //Call API to Generate Access Token
      this.fetchData();
    });
  }

  fetchData() {
    console.log("this.auth_code : ", this.auth_code);
    if (this.auth_code != "") {
      this.apiService.fetchAuthToken(this.auth_code)
        .subscribe(
          response => {
            this.data = response;
            console.log("Response : ", this.data);
          },
          error => console.error('Error fetching data', error)
        );
    } else {
      window.alert("Auth Code Not Found");
    }
  }
}
