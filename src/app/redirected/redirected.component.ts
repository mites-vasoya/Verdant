import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-redirected',
  templateUrl: './redirected.component.html',
  styleUrl: './redirected.component.css'
})
export class RedirectedComponent implements OnInit{
  constructor(private router: Router, private route : ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log("Query params : ", params);
    });
  }

}
