import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CubeComponent } from './cube/cube.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CubeComponent, ],
  exports: [CubeComponent, ]
})
export class CubeModule { }