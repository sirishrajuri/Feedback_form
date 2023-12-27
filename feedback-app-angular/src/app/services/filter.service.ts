import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filterBy =new BehaviorSubject<string>('All')
  constructor() { }
  getFilterBy() {
    return this.filterBy.asObservable()
  }

}
