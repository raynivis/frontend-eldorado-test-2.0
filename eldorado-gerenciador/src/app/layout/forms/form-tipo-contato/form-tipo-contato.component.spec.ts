import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTipoContatoComponent } from './form-tipo-contato.component';

describe('FormTipoContatoComponent', () => {
  let component: FormTipoContatoComponent;
  let fixture: ComponentFixture<FormTipoContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTipoContatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTipoContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
