import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe activar el loading', () => {

    service.present();
    service.isLoading.subscribe(
      (res: boolean) => expect(res).toBeTruthy()
    )
    
  });

  it('Debe desactivar el loading', () => {

    service.present();
    service.dismiss();
    setTimeout(
      ()=>{
        service.isLoading.subscribe(
          (res: boolean) => {
            expect(res).toBeFalsy()
          }
        )
      }, 1000
    )
    
    
  });
});
