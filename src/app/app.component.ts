import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // IMPORTANTE
import { FormsModule } from '@angular/forms';   // IMPORTANTE

interface Pet {
  id: number;
  nome: string;
  especie: string;
  nomeDono: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule], // Isso faz as chaves {{ }} sumirem
  template: `
    <div class="container">
      <h1>Gerenciador de Pets</h1>
      <form (ngSubmit)="salvar()">
        <input [(ngModel)]="petAtual.nome" name="nome" placeholder="Nome do pet" required />
        <input [(ngModel)]="petAtual.especie" name="especie" placeholder="Espécie" required />
        <input [(ngModel)]="petAtual.nomeDono" name="nomeDono" placeholder="Nome do dono" required />
        <button type="submit">{{ editando ? 'Atualizar' : 'Adicionar' }}</button>
        @if (editando) {
          <button type="button" (click)="cancelar()">Cancelar</button>
        }
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Espécie</th>
            <th>Dono</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          @for (pet of pets; track pet.id) {
            <tr>
              <td>{{ pet.id }}</td>
              <td>{{ pet.nome }}</td>
              <td>{{ pet.especie }}</td>
              <td>{{ pet.nomeDono }}</td>
              <td>
                <button (click)="editar(pet)">Editar</button>
                <button (click)="excluir(pet.id)">Excluir</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class AppComponent implements OnInit {
  pets: Pet[] = [];
  petAtual: Pet = { id: 0, nome: '', especie: '', nomeDono: '' };
  editando = false;

  ngOnInit() {
    // Dados para a tabela não começar vazia
    this.pets = [
      { id: 1, nome: 'Thor', especie: 'Cão', nomeDono: 'Vinicius' },
      { id: 2, nome: 'Luna', especie: 'Gato', nomeDono: 'Beatriz' }
    ];
  }

  salvar() {
    if (this.editando) {
      const index = this.pets.findIndex(p => p.id === this.petAtual.id);
      if (index !== -1) this.pets[index] = { ...this.petAtual };
    } else {
      const novoId = this.pets.length > 0 ? Math.max(...this.pets.map(p => p.id)) + 1 : 1;
      this.pets.push({ ...this.petAtual, id: novoId });
    }
    this.cancelar();
  }

  editar(pet: Pet) {
    this.petAtual = { ...pet };
    this.editando = true;
  }

  excluir(id: number) {
    this.pets = this.pets.filter(p => p.id !== id);
  }

  cancelar() {
    this.petAtual = { id: 0, nome: '', especie: '', nomeDono: '' };
    this.editando = false;
  }
}