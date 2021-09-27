import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AppService 
{
  public loadingSource = new BehaviorSubject<boolean>(true);
  public loading = this.loadingSource.asObservable();

  constructor() { }
}
