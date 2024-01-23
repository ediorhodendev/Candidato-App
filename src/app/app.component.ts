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
    { label: 'Home', action: this.onClick.bind(this) },
    { label: 'Cadastro Candidato', action: () => this.navigateToCandidatoListagem() } 
  ];

  constructor(private router: Router) {} // Injete o Router no construtor

  private onClick() {
    this.router.navigate(['/cadastro-candidato-po']);
  }

  private navigateToCandidatoListagem() {
     this.router.navigate(['/candidatos']); // Navegue para a rota '/candidatos'
  }
}
