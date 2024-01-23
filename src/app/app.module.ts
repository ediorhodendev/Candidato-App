import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';

import { AppComponent } from './app.component';
import { CandidatoListagemComponent } from './candidato-listagem/candidato-listagem.component';

import { AppRoutingModule } from './app-routing.module'; // Importe o AppRoutingModule
import { PoModalModule } from '@po-ui/ng-components';
import { ReactiveFormsModule } from '@angular/forms';

import { CadastroCandidatoPoComponent } from './cadastro-candidato-po/cadastro-candidato-po.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    CandidatoListagemComponent,
    
    CadastroCandidatoPoComponent,
    HomeComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    PoModule,
    PoTemplatesModule,
    AppRoutingModule,
    PoModalModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
