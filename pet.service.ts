import { Injectable } from '@angular/core';

export interface Pet {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  nomeDono: string;
}

@Injectable({
  providedIn: 'root'
})
export class PetService {
  // Array com dados iniciais para a apresentação
  private pets: Pet[] = [
    { id: 1, nome: 'Thor', especie: 'Cão', raca: 'Golden Retriever', nomeDono: 'Vinicius' },
    { id: 2, nome: 'Luna', especie: 'Gato', raca: 'Siamês', nomeDono: 'Beatriz' },
    { id: 3, nome: 'Max', especie: 'Cão', raca: 'Poodle', nomeDono: 'Carlos' }
  ];

  constructor() { }

  // Retorna todos os pets
  listar(): Pet[] {
    return this.pets;
  }

  // Adiciona um novo pet ao array
  inserir(pet: Pet): void {
    // Lógica para gerar o próximo ID baseado no maior ID existente
    const proximoId = this.pets.length > 0 ? Math.max(...this.pets.map(p => p.id)) + 1 : 1;
    pet.id = proximoId;
    this.pets.push(pet);
  }

  // Atualiza um pet existente
  alterar(petEditado: Pet): void {
    const index = this.pets.findIndex(p => p.id === petEditado.id);
    if (index !== -1) {
      this.pets[index] = { ...petEditado };
    }
  }

  // Remove o pet da lista
  remover(id: number): void {
    this.pets = this.pets.filter(p => p.id !== id);
  }
}