import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenesComponent } from './scenes.component';

@NgModule({
  declarations: [ScenesComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ScenesComponent
  ]
})
export class ScenesModule { }
