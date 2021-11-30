import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { CanComponentDeactivate, CanDeactivateGuard } from './can-deactivate-guard.service';

class MockComponent implements CanComponentDeactivate {
  returnValue!: boolean | Observable<boolean>;

  canDeactivate(): boolean | Observable<boolean> {
    return this.returnValue;
  }
}

describe('CanDeactivateGuardService', () => {
  let service: CanDeactivateGuard;
  let mockComponent: MockComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivateGuard, MockComponent],
    });
    service = TestBed.inject(CanDeactivateGuard);
    mockComponent = TestBed.inject(MockComponent);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe ser verdadero', () => {
    mockComponent.returnValue = true;
    expect(service.canDeactivate(mockComponent)).toBeTruthy();
  });
});
