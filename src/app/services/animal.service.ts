import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:5094/api/animais';

  listarTodos(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.API_URL);
  }

  buscarPorId(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.API_URL}/${id}`);
  }

  cadastrar(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(this.API_URL, animal);
  }

  atualizar(animal: Animal): Observable<Animal> {
    return this.http.put<Animal>(`${this.API_URL}/${animal.id}`, animal);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}