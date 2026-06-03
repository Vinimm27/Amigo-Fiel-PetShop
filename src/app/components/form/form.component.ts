import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  private readonly animalService = inject(AnimalService);

  @Input() pet: Animal = {
    id: 0,
    nome: '',
    especie: '',
    idade: 0,
    telefoneDono: ''
  };

  @Output() petSalvo = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  onSubmit() {
    if (this.pet.id) {
      this.animalService.atualizar(this.pet).subscribe({
        next: () => {
          console.log('Pet atualizado com sucesso');
          this.petSalvo.emit();
        },
        error: (err) => console.error('Erro ao atualizar pet', err)
      });
    } else {
      this.animalService.cadastrar(this.pet).subscribe({
        next: () => {
          console.log('Pet cadastrado com sucesso');
          this.petSalvo.emit();
        },
        error: (err) => console.error('Erro ao cadastrar pet', err)
      });
    }
  }
}
