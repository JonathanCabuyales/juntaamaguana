import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogporcobrarComponent } from './dialogporcobrar.component';

describe('DialogporcobrarComponent', () => {
  let component: DialogporcobrarComponent;
  let fixture: ComponentFixture<DialogporcobrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogporcobrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogporcobrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
