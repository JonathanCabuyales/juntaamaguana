import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogconsumoaguaComponent } from './dialogconsumoagua.component';

describe('DialogconsumoaguaComponent', () => {
  let component: DialogconsumoaguaComponent;
  let fixture: ComponentFixture<DialogconsumoaguaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogconsumoaguaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogconsumoaguaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
