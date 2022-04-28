import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmultaeditarComponent } from './dialogmultaeditar.component';

describe('DialogmultaeditarComponent', () => {
  let component: DialogmultaeditarComponent;
  let fixture: ComponentFixture<DialogmultaeditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogmultaeditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogmultaeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
