import { Component } from '@angular/core';
import { Pet, PetService } from './pet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  pets: Pet[] = [];
  petAtual: Pet = this.novoPet();
  editando = false;

  constructor(private petService: PetService) {
    this.atualizarLista();
  }

  novoPet(): Pet {
    return { id: 0, nome: '', especie: '', raca: '', nomeDono: '' };
  }

  atualizarLista() {
    this.pets = this.petService.listar();
  }

  salvar() {
    if (this.editando) {
      this.petService.alterar(this.petAtual);
    } else {
      this.petService.inserir(this.petAtual);
    }
    this.cancelar();
    this.atualizarLista();
  }

  editar(pet: Pet) {
    this.petAtual = { ...pet };
    this.editando = true;
  }

  excluir(id: number) {
    this.petService.remover(id);
    this.atualizarLista();
  }

  cancelar() {
    this.petAtual = this.novoPet();
    this.editando = false;
  }
}