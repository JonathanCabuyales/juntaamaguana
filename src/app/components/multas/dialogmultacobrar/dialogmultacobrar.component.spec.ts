import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmultacobrarComponent } from './dialogmultacobrar.component';

describe('DialogmultacobrarComponent', () => {
  let component: DialogmultacobrarComponent;
  let fixture: ComponentFixture<DialogmultacobrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogmultacobrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogmultacobrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
