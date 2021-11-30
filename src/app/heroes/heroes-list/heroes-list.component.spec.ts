import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesListComponent } from './heroes-list.component';
import { HeroesService } from '../../shared/services/heroes.service';
import { of } from 'rxjs';
import { YesCancelDialogService } from '../../shared/services/yes-cancel-dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Heroe } from '../../shared/models/heroe.model';

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let heroesService: jasmine.SpyObj<HeroesService>;
  let yesCancelDialogService: jasmine.SpyObj<YesCancelDialogService>;

  class MatSnackBarStub{
    open(){
      return {
        onAction: () => of({})
      }
    }
  }
  
  let fixture: ComponentFixture<HeroesListComponent>;
  const heroesArray: Heroe[] = [
    {
      id: 1,
      nombre: 'A',
      identidad: 'A',
      universo: 'A',
      poderes: ['fuerza'],
    },
  ];

  beforeEach(async () => {
    heroesService = jasmine.createSpyObj('HeroesService', ['getHeroes', 'deleteHeroe']);
    yesCancelDialogService = jasmine.createSpyObj('YesCancelDialogService', ['openConfirmModal']);

    await TestBed.configureTestingModule({
      declarations: [ HeroesListComponent ],
      providers: [ 
        { provide: HeroesService, useValue: heroesService },
        { provide: YesCancelDialogService, useValue: yesCancelDialogService },
        { provide: MatSnackBar, useClass: MatSnackBarStub }
      ],
      imports: [
        [
          FormsModule,
          ReactiveFormsModule,
        ]
      ]
    })
    .compileComponents();

    heroesService.getHeroes.and.returnValue(of(heroesArray));
    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Al confirmar el borrado, debe llamar al deleteHeroe', () => {

    yesCancelDialogService.openConfirmModal.and.returnValue(of(true));
    heroesService.deleteHeroe.and.returnValue(of(heroesArray[0]));
    component.openRemoveConfirmModal(heroesArray[0]);
    expect(heroesService.deleteHeroe).toHaveBeenCalled();

  });

  
});
