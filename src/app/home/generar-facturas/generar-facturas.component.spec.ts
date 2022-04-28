import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarFacturasComponent } from './generar-facturas.component';

describe('GenerarFacturasComponent', () => {
  let component: GenerarFacturasComponent;
  let fixture: ComponentFixture<GenerarFacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarFacturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
