import { Component, OnInit, ContentChild, TemplateRef } from '@angular/core';

type CubeSide = 'front' | 'left' | 'right' | 'back';

interface CubeTemplates {
  left: TemplateRef<any>;
  right: TemplateRef<any>;
  front: TemplateRef<any>;
  back: TemplateRef<any>;
}

@Component({
  selector: 'app-cube',
  template: `
  <div class="cube" [style.transform]="cubeTransform()">
    <div class="cube-side cube-left">
      Left
      <ng-container *ngTemplateOutlet="getTemplates().left "></ng-container>
    </div>
    <div class="cube-side cube-front">
      Front
      <ng-container *ngTemplateOutlet="getTemplates().front"></ng-container>
    </div>
    <div class="cube-side cube-right">
      Right
      <ng-container *ngTemplateOutlet="getTemplates().right"></ng-container>
    </div>
    <div class="cube-side cube-back">
      Back
      <ng-container *ngTemplateOutlet="getTemplates().back"></ng-container>
    </div>
  </div>
  `,
  styleUrls: ['./cube.component.css']
})
export class CubeComponent {
  @ContentChild('prevTpl', { static: false, read: TemplateRef })
  prevTpl: TemplateRef<any> | null;

  @ContentChild('currTpl', { static: false, read: TemplateRef })
  currTpl: TemplateRef<any> | null;

  @ContentChild('nextTpl', { static: false, read: TemplateRef })
  nextTpl: TemplateRef<any> | null;

  @ContentChild('emptyTpl', { static: false, read: TemplateRef })
  emptyTpl: TemplateRef<any>;

  private currentSide: CubeSide = 'front';
  private index = 0;
  private templatesMap: Map<CubeSide, CubeTemplates>

  ngAfterContentInit() {
    this.templatesMap = new Map<CubeSide, CubeTemplates>()
      .set('front', { front: this.currTpl, left: this.prevTpl, right: this.nextTpl, back: this.emptyTpl })
      .set('back', { front: this.emptyTpl, left: this.nextTpl, right: this.prevTpl, back: this.currTpl })
      .set('left', { front: this.nextTpl, left: this.currTpl, right: this.emptyTpl, back: this.prevTpl })
      .set('right', { front: this.prevTpl, left: this.emptyTpl, right: this.currTpl, back: this.currTpl });
  }

  next() {
    this.index++;
    const sides: CubeSide[] = ['front', 'right', 'back', 'left'];
    const nextSideIndx = sides.findIndex(s => s === this.currentSide) + 1
    this.currentSide = sides[nextSideIndx] || sides[0];
  }

  prev() {
    this.index--;
    const sides: CubeSide[] = ['front', 'right', 'back', 'left'];
    const nextSideIndx = sides.findIndex(s => s === this.currentSide) - 1
    this.currentSide = sides[nextSideIndx] || sides[sides.length - 1];
  }


  cubeTransform() {
    const deg = this.index === 0 ? 0 : this.index * -90;
    return `rotateY(${deg}deg)`;
  }

  getTemplates() {
    return this.templatesMap.get(this.currentSide);
  }
}
