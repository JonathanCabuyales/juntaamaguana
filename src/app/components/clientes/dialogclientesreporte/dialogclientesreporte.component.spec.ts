import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogclientesreporteComponent } from './dialogclientesreporte.component';

describe('DialogclientesreporteComponent', () => {
  let component: DialogclientesreporteComponent;
  let fixture: ComponentFixture<DialogclientesreporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogclientesreporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogclientesreporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
