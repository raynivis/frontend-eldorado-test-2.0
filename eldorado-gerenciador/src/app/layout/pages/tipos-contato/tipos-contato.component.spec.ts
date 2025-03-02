import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposContatoComponent } from './tipos-contato.component';

describe('TiposContatoComponent', () => {
  let component: TiposContatoComponent;
  let fixture: ComponentFixture<TiposContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposContatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
