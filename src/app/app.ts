import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './components/lista/lista.component';
import { FormComponent } from './components/form/form.component';
import { Animal } from './models/animal.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ListaComponent, FormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  currentView: 'lista' | 'formulario' = 'lista';
  selectedPet: Animal = { id: 0, nome: '', especie: '', idade: 0, telefoneDono: '' };

  onNovo(): void {
    this.selectedPet = { id: 0, nome: '', especie: '', idade: 0, telefoneDono: '' };
    this.currentView = 'formulario';
  }

  onEditar(pet: Animal): void {
    this.selectedPet = { ...pet };
    this.currentView = 'formulario';
  }

  onSalvo(): void {
    this.currentView = 'lista';
  }

  onCancelar(): void {
    this.currentView = 'lista';
  }
}
