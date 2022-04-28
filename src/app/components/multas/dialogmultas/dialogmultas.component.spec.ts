import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmultasComponent } from './dialogmultas.component';

describe('DialogmultasComponent', () => {
  let component: DialogmultasComponent;
  let fixture: ComponentFixture<DialogmultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogmultasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogmultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
