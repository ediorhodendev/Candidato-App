
import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '../candidato.service';
import { Candidato } from 'src/candidato.model';
import { PoTableModule } from '@po-ui/ng-components';
import { Router } from '@angular/router';




@Component({
  selector: 'app-candidato-listagem',
  templateUrl: './candidato-listagem.component.html',
  styleUrls: ['./candidato-listagem.component.css']
})

export class CandidatoListagemComponent implements OnInit {
  candidatos: Candidato[] = [];
  candidatoEmEdicao: Candidato | null = null;
  modalTitle: string = '';
  modalVisible: boolean = false;
  modalAberto: boolean = false;
  nomePesquisa: string = '';
  candidatosFiltrados: Candidato[] = [];

  columns: any[] = [];

  literals = {
    loadMoreData: 'Carregar mais',
    loadingData: 'Carregando...',
    noData: 'Nenhum dado encontrado',
    seeComplete: 'Ver completo',
    completeTitle: 'Detalhes do candidato'
  };
  constructor(private candidatoService: CandidatoService, private router: Router) {}



  ngOnInit() {
    this.carregarCandidatos();
  }

  carregarCandidatos() {
    this.candidatoService.listarCandidatos().subscribe((candidatos) => {
      this.candidatos = candidatos;
      this.filtrarCandidatos();
    });
  }



  abrirModalCriacao() {

    alert("dgshgsah");
    // Navegar para a tela de cadastro
    this.router.navigate(['/cadastro-candidato-po']);
  }

  abrirModalEdicao(candidato: Candidato) {
    // Enviar os dados do candidato para a tela de edição
    this.router.navigate(['/cadastro-candidato-po'], { state: { candidato } });
  }

  salvarCandidato(candidato: Candidato) {
    if (candidato.id) {
      this.candidatoService.atualizarCandidato(candidato).subscribe(() => {
        this.modalVisible = false;
        this.carregarCandidatos();
      });
    } else {
      this.candidatoService.criarCandidato(candidato).subscribe(() => {
        this.modalVisible = false;
        this.carregarCandidatos();
      });
    }
  }

  cancelar() {
    this.modalVisible = false;
  }

  pesquisarCandidatos() {
    this.filtrarCandidatos();
  }

  private filtrarCandidatos() {
    if (!this.nomePesquisa) {
      this.candidatosFiltrados = [...this.candidatos];
    } else {
      this.candidatosFiltrados = this.candidatos.filter((candidato) =>
        candidato.nome.toLowerCase().includes(this.nomePesquisa.toLowerCase())
      );
    }
  }

  deletarCandidato(candidato: Candidato) {
    if (confirm(`Tem certeza que deseja excluir o candidato ${candidato.nome}?`)) {
      this.candidatoService.deletarCandidato(candidato.id).subscribe(() => {
        this.carregarCandidatos();
      });
    }
  }
}