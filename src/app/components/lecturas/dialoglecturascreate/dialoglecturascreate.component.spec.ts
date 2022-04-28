import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoglecturascreateComponent } from './dialoglecturascreate.component';

describe('DialoglecturascreateComponent', () => {
  let component: DialoglecturascreateComponent;
  let fixture: ComponentFixture<DialoglecturascreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialoglecturascreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoglecturascreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
