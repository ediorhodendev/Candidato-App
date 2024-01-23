// candidato-modal.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-candidato-modal',
  templateUrl: './candidato-modal.component.html',
  styleUrls: ['./candidato-modal.component.css']
})
export class CandidatoModalComponent {
  @Input() modalTitle: string = 'Título do Modal';
  @Input() modalVisible: boolean = false;
  @Output() salvar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();

  candidato: any = {}; // Modelo do candidato

  constructor() { }

  abrirModal() {
    this.modalVisible = true;
  }

  fecharModal() {
    this.modalVisible = false;
    this.cancelar.emit();
  }

  salvarCandidato() {
    // Valide e processe o candidato conforme necessário
    this.salvar.emit(this.candidato);
    this.modalVisible = false;
  }
}

