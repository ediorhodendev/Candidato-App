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
  candidatos: Candidato[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private poNotification: PoNotificationService,
    private candidatoService: CandidatoService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: [''],
      cpf: ['']
    });

    // Recupera a lista de candidatos já cadastrados
    this.candidatoService.listarCandidatos().subscribe((candidatos) => {
      this.candidatos = candidatos;
    });

    // Recupera os dados do candidato da rota
    const candidato: Candidato = history.state.candidato;

    if (candidato) {
      this.candidato = candidato;
      this.isNovoCandidato = false;
    }
  }

 

  salvarCandidato() {
    const cpfValido = this.validarCPF(this.candidato.cpf);
    const emailValido = this.validarEmail(this.candidato.email);

    if (!cpfValido) {
      alert('CPF inválido. O formato deve ser xxxxxxxxxxx.');
      return;
    }

    if (!emailValido) {
      alert('Email inválido. Deve ser um endereço de email válido.');
      return;
    }
    // Verifica se o EMAIL já existe na lista de candidatos
    if (this.emailJaCadastrado(this.candidato.email)) {
      alert('EMAIL já cadastrado.');
      return;
    }
    // Verifica se o CPF já existe na lista de candidatos
    if (this.cpfJaCadastrado(this.candidato.cpf)) {
      alert('CPF já cadastrado.');
      return;
    }



    if (this.isNovoCandidato === true) {
      this.candidatoService.criarCandidato(this.candidato).subscribe(
        (response) => {
          if (response) {
            this.poNotification.success('Candidato cadastrado com sucesso.');
            this.router.navigate(['/candidatos']);
          } else {
            alert('Erro ao cadastrar o candidato.');
          }
        },
        (error) => {
          console.error('Erro na requisição de criação:', error);
        }
      );
    } else {
      // O mesmo processo se aplica à atualização do candidato
    }
  }

  private validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
      return false;
    }

    const cpfArray = cpf.split('');
    const dv1 = parseInt(cpfArray[9]);
    const dv2 = parseInt(cpfArray[10]);

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpfArray[i]) * (10 - i);
    }
    const remainder = 11 - (sum % 11);
    const calculatedDV1 = remainder >= 10 ? 0 : remainder;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpfArray[i]) * (11 - i);
    }
    const remainder2 = 11 - (sum % 11);
    const calculatedDV2 = remainder2 >= 10 ? 0 : remainder2;

    return dv1 === calculatedDV1 && dv2 === calculatedDV2;
  }

  private validarEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  // Método para verificar se o CPF já existe na lista de candidatos
  private cpfJaCadastrado(cpf: string): boolean {
    return this.candidatos.some((c) => c.cpf === cpf);
  }

  private emailJaCadastrado(email: string): boolean {
    return this.candidatos.some((c) => c.email === email);
  }
  cancelar() {
    this.router.navigate(['/candidatos']);
  }
}
