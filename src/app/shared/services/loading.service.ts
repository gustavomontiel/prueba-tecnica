import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading: any;
  private requests = 0;

  constructor() { 
    this.isLoading = new BehaviorSubject(false)
  }

  present() {
    this.requests++;
    if (this.requests === 1) {
      this.isLoading.next(true);
    }
  }

  dismiss() {
    this.requests--;
    if (this.requests < 1) {
      // setTimeout solo para que se vea el loading en pantalla
      setTimeout(
        ()=>{
          this.isLoading.next(false);
        }, 1000
      )
    }
  }
}
