import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
import { Heroe } from '../models/heroe.model';
import { HeroesService } from './heroes.service';

describe('HeroesService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: HeroesService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new HeroesService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Se espera un array de héroes', (done: DoneFn) => {
    const expectedData = [
      {
        id: 1,
        nombre: 'A',
        identidad: 'A',
        universo: 'A',
        poderes: ['fuerza'],
      },
    ];

    httpClientSpy.get.and.returnValue(of(expectedData));

    service.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(expectedData);
      done();
    });
  });

  it('Se espera un array de héroes con filtro por nombre', (done: DoneFn) => {
    const data = [
      {
        id: 1,
        nombre: 'A',
        identidad: 'A',
        universo: 'A',
        poderes: ['fuerza'],
      },
      {
        id: 1,
        nombre: 'B',
        identidad: 'A',
        universo: 'A',
        poderes: ['fuerza'],
      },
    ];
    
    const filtro = 'B';
    const expectedData = data.filter( x => x.nombre === filtro);
    service.heroes = data;

    service.getHeroes(filtro).subscribe((heroes) => {
      expect(heroes).toEqual(expectedData);
      done();
    });
  });

  it('Se espera un héroe existente', (done: DoneFn) => {
    const data = [
      {
        id: 1,
        nombre: 'A',
        identidad: 'A',
        universo: 'A',
        poderes: ['fuerza'],
      },
    ];
    const expectedData = data[0];
    service.heroes = data;

    service.getHeroe(1).subscribe((heroe) => {
      expect(heroe).toEqual(expectedData);
      done();
    });
  });

  it('Se espera un nuevo héroe con id', (done: DoneFn) => {
    const heroe: Heroe = {
      nombre: 'A',
      identidad: 'A',
      universo: 'A',
      poderes: ['fuerza'],
    };
    const expectedData = { ...heroe, id: 1 };

    service.postHeroe(heroe).subscribe((heroeNuevo) => {
      expect(heroeNuevo).toEqual(expectedData);
      done();
    });
  });

  it('Se espera un héroe con nombre modificado', (done: DoneFn) => {
    const data: Heroe[] = [
      {
        id: 1,
        nombre: 'A',
        identidad: 'A',
        universo: 'A',
        poderes: ['fuerza'],
      },
    ];

    service.heroes = data;
    const heroe = data[0];
    const expectedData = { ...heroe, nombre: 'AAA' };

    service.putHeroe(expectedData).subscribe((heroeModificado) => {
      expect(heroeModificado).toEqual(expectedData);
      done();
    });
  });

  it('Se espera un héroe eliminado', (done: DoneFn) => {
    const data: Heroe[] = [
      {
        id: 1,
        nombre: 'A',
        identidad: 'A',
        universo: 'A',
        poderes: ['fuerza'],
      },
    ];

    service.heroes = data;

    const expectedData = { ...data[0] };

    service.deleteHeroe(1).subscribe((heroeModificado) => {
      expect(heroeModificado).toEqual(expectedData);
      done();
    });
  });
});
