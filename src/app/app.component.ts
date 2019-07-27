import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Story } from './data.service';
import { Observable } from 'rxjs';
import { map, switchMap, tap, delay } from 'rxjs/operators';
import { CubeComponent } from './cube/cube/cube.component';

@Component({
  selector: 'my-app',
  template: `
    <div *ngIf="id$ | async as id" class="nav">
      <button (click)="prev(id)" [disabled]="!(hasPrev$ | async)">Back</button>
      <button (click)="next(id)" [disabled]="!(hasNext$ | async)">Next</button>
    </div>

    <app-cube #cube>
      <ng-template #prevTpl>
        {{ prev$ | async | json }}
      </ng-template>
      <ng-template #currTpl>
        {{ curr$ | async | json   }}
      </ng-template>
      <ng-template #nextTpl>
        {{ next$ | async | json }}
      </ng-template>
      <ng-template #emptyTpl>
        Empty
      </ng-template>
    </app-cube>
  `,
  styles: [`:host { display: block; margin: 24px;}.nav { position: fixed; right: 0; z-index:1000;`]
})
export class AppComponent {
  @ViewChild(CubeComponent, { static: false }) cube: CubeComponent;

  id$ = this.activatedRoute.queryParamMap.pipe(
    map(paramMap => Number(paramMap.get('id'))),
    // tap(id => console.log({ id}))
  )
  hasNext$: Observable<boolean> = this.id$.pipe(
    switchMap(id => this.data.hasNext(id)),
    // tap(hasNext => console.log({ hasNext }))
  )
  hasPrev$: Observable<boolean> = this.id$.pipe(
    switchMap(id => this.data.hasPrev(id)),
    // tap(hasPrev => console.log({ hasPrev }))
  )
  curr$: Observable<Story> = this.id$.pipe(
    switchMap(id => this.data.getCurr(id)),
    // tap(curr => console.log({ curr })),
  )

  next$: Observable<Story> = this.id$.pipe(
    switchMap(id => this.data.getNext(id)),
    // tap(next => console.log({ next })),
  )

  prev$: Observable<Story> = this.id$.pipe(
    switchMap(id => this.data.getPrev(id)),
    // tap(prev => console.log({ prev })),
  )

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public data: DataService
  ) {
  }

  next(id: number) {
    this.router.navigate([], { queryParams: { id: id + 1 } })
    this.cube.next()
  }

  prev(id: number) {
    this.router.navigate([], { queryParams: { id: id - 1 } })
    this.cube.prev()
  }
}
