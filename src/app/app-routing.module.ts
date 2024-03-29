import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatoListagemComponent } from 'src/app/candidato-listagem/candidato-listagem.component';
import { CadastroCandidatoPoComponent } from '../app/cadastro-candidato-po/cadastro-candidato-po.component'
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  
  { path: 'Home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirecione a raiz para a página Home
  { path: 'candidatos', component: CandidatoListagemComponent }, 
  { path: 'cadastro', component: CadastroCandidatoPoComponent }, 
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



