import { Injectable, signal } from '@angular/core';
import { Pet } from './pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  // Array com dados iniciais para a apresentação
  private pets = signal<Pet[]>([
    { id: 1, nome: 'Thor', especie: 'Cão', raca: 'Golden Retriever', nomeDono: 'Vinicius' },
    { id: 2, nome: 'Luna', especie: 'Gato', raca: 'Siamês', nomeDono: 'Beatriz' },
    { id: 3, nome: 'Max', especie: 'Cão', raca: 'Poodle', nomeDono: 'Carlos' }
  ]);

  // Retorna todos os pets
  listar(): Pet[] {
    return this.pets();
  }
}
