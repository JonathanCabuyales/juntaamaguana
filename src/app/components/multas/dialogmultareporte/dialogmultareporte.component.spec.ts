import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmultareporteComponent } from './dialogmultareporte.component';

describe('DialogmultareporteComponent', () => {
  let component: DialogmultareporteComponent;
  let fixture: ComponentFixture<DialogmultareporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogmultareporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogmultareporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
