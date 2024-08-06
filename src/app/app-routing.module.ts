import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RedirectedComponent} from "./redirected/redirected.component";

const routes: Routes = [{
  path: "redirect", component:RedirectedComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
