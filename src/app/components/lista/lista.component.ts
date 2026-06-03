import { Component, OnInit, signal, computed, inject, Output, EventEmitter } from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal.model';

@Component({
  selector: 'app-lista',
  standalone: true,
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  private readonly animalService = inject(AnimalService);

  @Output() novo = new EventEmitter<void>();
  @Output() editarPet = new EventEmitter<Animal>();

  // Estados Reativos com Signals
  animais = signal<Animal[]>([]);
  
  // Computed atualiza automaticamente quando o signal 'animais' muda
  total = computed(() => this.animais().length);

  ngOnInit(): void {
    this.carregarAnimais();
  }

  carregarAnimais(): void {
    this.animalService.listarTodos().subscribe({
      next: (dados) => {
        console.log('Dados recebidos da API:', dados);
        this.animais.set(dados);
      },
      error: (err) => console.error('Erro ao buscar dados da API', err)
    });
  }

  remover(id: number): void {
    this.animalService.excluir(id).subscribe({
      next: () => {
        console.log(`Pet com ID ${id} deletado com sucesso do servidor.`);
        // Remove localmente do Signal de forma reativa instantânea
        this.animais.update(lista => lista.filter(pet => pet.id !== id));
      },
      error: (err) => console.error('Erro ao excluir pet', err)
    });
  }
}
