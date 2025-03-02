import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTipoContatoComponent } from './cadastro-tipo-contato.component';

describe('CadastroTipoContatoComponent', () => {
  let component: CadastroTipoContatoComponent;
  let fixture: ComponentFixture<CadastroTipoContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroTipoContatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroTipoContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
