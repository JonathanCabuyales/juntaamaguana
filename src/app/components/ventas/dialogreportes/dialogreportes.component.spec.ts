import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogreportesComponent } from './dialogreportes.component';

describe('DialogreportesComponent', () => {
  let component: DialogreportesComponent;
  let fixture: ComponentFixture<DialogreportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogreportesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogreportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
