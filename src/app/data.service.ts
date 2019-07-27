import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap} from 'rxjs/operators';

export interface Story {
  id: number;
}

@Injectable()
export class DataService {

  private stories = of([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ]);

  hasNext(id: number): Observable<boolean> {
    return this.stories.pipe(
      map(stories => stories.findIndex(story => story.id === id) < stories.length  -1)
    )
  }

  hasPrev(id: number): Observable<boolean> {
    return this.stories.pipe(
      map(stories => stories.findIndex(story => story.id === id) > 0)
    )
  }

  getPrev(id: number) {
    return this.stories.pipe(
      map(stories => stories[stories.findIndex(story => story.id === id) - 1])
    )
  }
  getNext(id: number) {
    return this.stories.pipe(
      map(stories => stories[stories.findIndex(story => story.id === id) + 1])
    )
  }

  getCurr(id: number) {
    return this.stories.pipe(
      map(stories => stories[stories.findIndex(story => story.id === id)]),
    )
  }
}