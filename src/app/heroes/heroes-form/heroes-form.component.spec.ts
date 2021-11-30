import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, BehaviorSubject } from 'rxjs';
import { HeroesService } from 'src/app/shared/services/heroes.service';
import { YesCancelDialogService } from 'src/app/shared/services/yes-cancel-dialog.service';
import { HeroesFormComponent } from './heroes-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Heroe } from 'src/app/shared/models/heroe.model';

describe('HeroesFormComponent', () => {

  let component: HeroesFormComponent;
  let fixture: ComponentFixture<HeroesFormComponent>;
  let heroesService: jasmine.SpyObj<HeroesService>;
  let yesCancelDialogService: jasmine.SpyObj<YesCancelDialogService>;

  class MatSnackBarStub{
    open(){
      return {
        onAction: () => of({})
      }
    }
  }

  const heroesArray: Heroe[] = [
    {
      id: 1,
      nombre: 'A',
      identidad: 'A',
      universo: 'A',
      poderes: ['fuerza'],
    },
  ];

  class MockActivatedRoute {
    params: BehaviorSubject<any> = new BehaviorSubject({ id: '' });
  }
  const mockActivatedRoute = new MockActivatedRoute();

  beforeEach(async () => {
    heroesService = jasmine.createSpyObj('HeroesService', [
      'getHeroe',
      'postHeroe',
      'putHeroe',
    ]);
    yesCancelDialogService = jasmine.createSpyObj('YesCancelDialogService', [
      'openConfirmModal',
    ]);

    await TestBed.configureTestingModule({
      declarations: [HeroesFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: HeroesService, useValue: heroesService },
        { provide: YesCancelDialogService, useValue: yesCancelDialogService },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
      imports: [
        [
          NoopAnimationsModule,
          RouterTestingModule,
          FormsModule,
          ReactiveFormsModule,
          MatSelectModule,
          MatFormFieldModule,
          MatInputModule,
          MatIconModule,
        ],
      ],
    }).compileComponents();

    yesCancelDialogService.openConfirmModal.and.returnValue(of(true));

  });

  afterEach(() => {
    fixture.destroy();
    mockActivatedRoute.params.next({ id: '' });
  });

  it('Se crea formulario para creación de nuevo héroe', () => {
    fixture = TestBed.createComponent(HeroesFormComponent);
    component = fixture.componentInstance;
    
    expect(component).toBeTruthy();
  });

  it('Se crea formulario para actualizar un héroe existente', () => {
    mockActivatedRoute.params.next({ id: '1' });

    heroesService.getHeroe.and.returnValue(of(heroesArray[0]));
    fixture = TestBed.createComponent(HeroesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   
    expect(component).toBeTruthy();
  });

  it('Se debe llamar crear un nuevo héroe', () => {
    fixture = TestBed.createComponent(HeroesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    heroesService.postHeroe.and.returnValue(of(heroesArray[0]));
    component.saveHeroe();
    
    expect(heroesService.postHeroe).toHaveBeenCalled();
  });

  it('Se debe llamar actualizar un héroe existente', () => {
    mockActivatedRoute.params.next({ id: '1' });

    heroesService.getHeroe.and.returnValue(of(heroesArray[0]));
    fixture = TestBed.createComponent(HeroesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    heroesService.putHeroe.and.returnValue(of(heroesArray[0]));
    component.saveHeroe();

    expect(heroesService.putHeroe).toHaveBeenCalled();
  });

  it('Se debe eliminar un poder', () => {
    
    fixture = TestBed.createComponent(HeroesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.removePoder(0);

    expect(component.poderes.length).toBe(0);
  });

  it('Al confirmar el guardado, debe llamar al postHeroe', () => {
    
    fixture = TestBed.createComponent(HeroesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    heroesService.postHeroe.and.returnValue(of(heroesArray[0]));
    component.openSaveConfirmModal();
    
    expect(heroesService.postHeroe).toHaveBeenCalled();
  });
});
