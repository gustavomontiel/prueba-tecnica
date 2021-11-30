import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Heroe } from '../models/heroe.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  urlApi = '/assets/mock/db.json';
  heroes!: Heroe[];

  constructor(private httpClient: HttpClient) {}

  getHeroes(filter: string = '') {
    if (this.heroes) return of(this.filtrarNombre(filter));

    return this.httpClient.get(this.urlApi).pipe(
      map((heroes) => {
        this.heroes = heroes as Heroe[];
        return this.filtrarNombre(filter);
      })
    );
  }

  filtrarNombre(filter: string='') {
    const filterLower: string = filter.toLocaleLowerCase();
    return (this.heroes as Heroe[]).filter((heroe) => heroe.nombre.toLocaleLowerCase().includes(filterLower));
  }

  getHeroe(id: number) {
    const heroe = this.heroes.find((heroe: Heroe) => heroe.id === id);
    return of(heroe);
  }

  postHeroe(heroe: Heroe) {
    !this.heroes && (this.heroes = []);
    heroe.id = this.heroes.reduce(
      (max = 0, heroe) => (heroe.id! > max ? heroe.id : max),
      0
    );
    heroe.id = heroe.id! + 1;
    this.heroes.push(heroe);
    return of(heroe);
  }

  putHeroe(heroeModificado: Heroe) {
    let heroeEncontrado = this.heroes.find((heroe) => heroe.id === heroeModificado.id);
    heroeEncontrado && Object.assign(heroeEncontrado, heroeModificado);
    return of(heroeEncontrado);
  }

  deleteHeroe(id: number) {
    let heroeEncontrado = this.heroes.find((heroe) => heroe.id === id);
    this.heroes = this.heroes.filter((heroe) => heroe.id !== id);
    return of(heroeEncontrado);
  }
}
