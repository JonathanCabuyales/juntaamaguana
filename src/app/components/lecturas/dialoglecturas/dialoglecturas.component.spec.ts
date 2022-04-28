import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoglecturasComponent } from './dialoglecturas.component';

describe('DialoglecturasComponent', () => {
  let component: DialoglecturasComponent;
  let fixture: ComponentFixture<DialoglecturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialoglecturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoglecturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
