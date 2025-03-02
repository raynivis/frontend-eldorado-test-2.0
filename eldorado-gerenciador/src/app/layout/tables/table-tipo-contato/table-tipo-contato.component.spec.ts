import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTipoContatoComponent } from './table-tipo-contato.component';

describe('TableTipoContatoComponent', () => {
  let component: TableTipoContatoComponent;
  let fixture: ComponentFixture<TableTipoContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTipoContatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableTipoContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
