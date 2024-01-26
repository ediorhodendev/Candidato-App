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
  candidato = { nome: '', email: '', cpf: '', id:'' };
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
      alert('CPF inválido. O formato deve ser xxx.xxx.xxx-xx.');
      return;
    }

    if (!emailValido) {
      alert('Email inválido. Deve ser um endereço de email válido.');
      return;
    }

    // Verifica se o CPF já existe na lista de candidatos, apenas se for um novo candidato
    if (this.isNovoCandidato && this.cpfJaCadastrado(this.candidato.cpf)) {
      alert('CPF já cadastrado.');
      return;
    }

    // Verifica se o E-MAIL já existe na lista de candidatos, apenas se for um novo candidato
    if (this.isNovoCandidato && this.emailJaCadastrado(this.candidato.email)) {
      alert('E-MAIL já cadastrado.');
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
      
      if (this.candidato.id) {
        this.candidatoService.atualizarCandidato(this.candidato).subscribe(
          (response) => {
            if (response) {
              this.poNotification.success('Candidato atualizado com sucesso.');
              this.router.navigate(['/candidatos']);
            } else {
              alert(response);
              alert('Erro ao atualizar o candidato: A resposta da API indica erro.');
            }
          },
          (error) => {
            
            alert('Erro ao atualizar o candidato: Ocorreu um erro na requisição.');
          }
        );
      } else {
        
        alert('ID do candidato não está definido. Certifique-se de que o objeto this.candidato contenha o ID correto antes de atualizar.');
      }
      

    }
  }

  private validarCPF(cpf: string): boolean {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Verifica se o CPF possui 11 dígitos após a remoção de não numéricos
    if (cpf.length !== 11) {
      return false;
    }

    // Calcula os dígitos verificadores
    const digitos = cpf.substr(0, 9);
    const dv1 = this.calcularDigitoVerificador(digitos, 10);
    const dv2 = this.calcularDigitoVerificador(digitos + dv1, 11);

    // Verifica se os dígitos calculados são iguais aos dígitos fornecidos no CPF
    return parseInt(dv1) === parseInt(cpf.charAt(9)) && parseInt(dv2) === parseInt(cpf.charAt(10));
  }

  private calcularDigitoVerificador(cpfParcial: string, peso: number): string {
    let total = 0;
    for (let i = 0; i < cpfParcial.length; i++) {
      total += parseInt(cpfParcial.charAt(i)) * peso--;
    }
    const resto = total % 11;
    return resto < 2 ? '0' : (11 - resto).toString();
  }

  private validarEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  // Método para verificar se o CPF já existe na lista de candidatos
  private cpfJaCadastrado(cpf: string): boolean {
    return this.candidatos.some((c) => c.cpf === cpf);
  }

  // Método para verificar se o E-MAIL já existe na lista de candidatos
  private emailJaCadastrado(email: string): boolean {
    return this.candidatos.some((c) => c.email === email);
  }

  cancelar() {
    this.router.navigate(['/candidatos']);
  }
}
