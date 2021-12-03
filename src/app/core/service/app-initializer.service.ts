import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  private authServiceInitializerSubject: BehaviorSubject<boolean>;
  private appInitializedSubject: BehaviorSubject<boolean>;

  constructor() {
    this.authServiceInitializerSubject = new BehaviorSubject<boolean>(false);
    this.appInitializedSubject = new BehaviorSubject<boolean>(false);
  }

  getAppInitializationStatus(): Observable<boolean> {
    return this.appInitializedSubject;
  }

  setAuthServiceInitializationStatus(isInitialized: boolean): void {
    this.authServiceInitializerSubject.next(isInitialized);
    this.setAppInitializationStatus();
  }

  private setAppInitializationStatus() {
    if (this.authServiceInitializerSubject.value) {
      this.appInitializedSubject.next(true);
    } else {
      this.appInitializedSubject.next(false);
    }
  }
}
