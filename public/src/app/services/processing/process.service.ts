import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ProcessService
{
  public loadingSource = new BehaviorSubject<boolean>(true)
  public loading = this.loadingSource.asObservable();

  public moduleLoadingSource = new BehaviorSubject<boolean>(true)
  public moduleLoading = this.loadingSource.asObservable();

  public errorMsgSource = new BehaviorSubject<string>('')
  public errorMsg = this.errorMsgSource.asObservable();

  public successMsgSource = new BehaviorSubject<string>('')
  public successMsg = this.successMsgSource.asObservable();

  constructor() { }

  setLoading(value: boolean): void
  {
    this.loadingSource.next(value)
  }

  setModuleLoading(value: boolean): void
  {
    this.moduleLoadingSource.next(value)
  }

  setErroMsg(value: string): void
  {
    this.errorMsgSource.next(value)
    setTimeout(() => this.errorMsgSource.next(''), 5000)
  }
  
  setSuccessMsg(value: string): void
  {
    this.successMsgSource.next(value)
    setTimeout(() => this.successMsgSource.next(''), 2000)
  }

}
