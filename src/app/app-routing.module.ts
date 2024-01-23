import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatoListagemComponent } from 'src/app/candidato-listagem/candidato-listagem.component';
import { CadastroCandidatoPoComponent } from '../app/cadastro-candidato-po/cadastro-candidato-po.component'
const routes: Routes = [
  { path: 'candidatos', component: CandidatoListagemComponent }, 
  { path: 'cadastro-candidato-po', component: CadastroCandidatoPoComponent }, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



