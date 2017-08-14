import {NgModule} from "@angular/core";
import {MdProgressSpinnerModule} from "@angular/material";

@NgModule({
  imports: [MdProgressSpinnerModule],
  declarations: [
    MdProgressSpinnerModule
  ],
  exports: [
    MdProgressSpinnerModule
  ]
})
export class MyMaterialModule { }
