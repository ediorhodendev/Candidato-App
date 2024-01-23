import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importe o Router

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.navigateToHome.bind(this) },
    { label: 'Lista de Candidatos', action: () => this.navigateToCandidatoListagem() },
    { label: 'Cadastro de Candidatos', action: () => this.navigateToCadastrodeCandidatos() }  
  ];

  constructor(private router: Router) {} // Injete o Router no construtor

  private navigateToHome() {
    this.router.navigate(['/Home']);
  }

  private navigateToCandidatoListagem() {
     this.router.navigate(['/candidatos']); // Navegue para a rota '/candidatos'
  }

  private navigateToCadastrodeCandidatos() {
    this.router.navigate(['/cadastro']); 
 }
}
