import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCandidatoPoComponent } from './cadastro-candidato-po.component';

describe('CadastroCandidatoPoComponent', () => {
  let component: CadastroCandidatoPoComponent;
  let fixture: ComponentFixture<CadastroCandidatoPoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroCandidatoPoComponent]
    });
    fixture = TestBed.createComponent(CadastroCandidatoPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
