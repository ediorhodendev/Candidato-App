import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatoListagemComponent } from 'src/app/candidato-listagem/candidato-listagem.component';
import { CadastroCandidatoPoComponent } from '../app/cadastro-candidato-po/cadastro-candidato-po.component'
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: 'candidatos', component: CandidatoListagemComponent }, 
  { path: 'cadastro', component: CadastroCandidatoPoComponent }, 
  { path: 'Home', component: HomeComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



