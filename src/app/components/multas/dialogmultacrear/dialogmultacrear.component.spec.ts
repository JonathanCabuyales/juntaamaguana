import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmultacrearComponent } from './dialogmultacrear.component';

describe('DialogmultacrearComponent', () => {
  let component: DialogmultacrearComponent;
  let fixture: ComponentFixture<DialogmultacrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogmultacrearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogmultacrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
