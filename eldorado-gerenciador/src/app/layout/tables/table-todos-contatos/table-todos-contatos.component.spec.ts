import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTodosContatosComponent } from './table-todos-contatos.component';

describe('TableTodosContatosComponent', () => {
  let component: TableTodosContatosComponent;
  let fixture: ComponentFixture<TableTodosContatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTodosContatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableTodosContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
