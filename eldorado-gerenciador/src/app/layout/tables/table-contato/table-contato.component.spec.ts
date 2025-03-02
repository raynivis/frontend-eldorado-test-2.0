import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableContatoComponent } from './table-contato.component';

describe('TableContatoComponent', () => {
  let component: TableContatoComponent;
  let fixture: ComponentFixture<TableContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableContatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
