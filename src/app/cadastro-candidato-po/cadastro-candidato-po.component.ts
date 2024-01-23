import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { CandidatoService } from '../candidato.service';
import { Candidato } from 'src/candidato.model';

@Component({
  selector: 'cadastro',
  templateUrl: './cadastro-candidato-po.component.html',
  styleUrls: ['./cadastro-candidato-po.component.css']
})
export class CadastroCandidatoPoComponent implements OnInit {
  candidato = { nome: '', email: '', cpf: '' };
  form!: FormGroup;
  isNovoCandidato = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private poNotification: PoNotificationService,
    private candidatoService: CandidatoService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      cpf: ['', [Validators.required, Validators.pattern('\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}')]]
    });

    // Recuperar os dados do candidato da rota
    const candidato: Candidato = history.state.candidato;

    if (candidato) {
      // Preencher os campos do formulário com os dados do candidato
      this.candidato = candidato;
      this.isNovoCandidato = false; // Não é um novo candidato
    }
  }

  salvarCandidato() {
    if (this.form.valid) {
      // Se o formulário for válido
      if (this.isNovoCandidato === true) {
        this.candidatoService.criarCandidato(this.candidato).subscribe(() => {
          this.poNotification.success('Candidato cadastrado com sucesso.');
          this.router.navigate(['/candidatos']);
        });
      } else {
        this.candidatoService.atualizarCandidato(this.candidato).subscribe(() => {
          this.poNotification.success('Candidato salvo com sucesso.');
          this.router.navigate(['/candidatos']);
        });
      }
    } else {
      // Se o formulário for inválido ou campos de e-mail e CPF forem preenchidos incorretamente
      this.poNotification.error('Verifique os campos do formulário.');
    }
  }

  cancelar() {
    this.router.navigate(['/candidatos']);
  }
}

