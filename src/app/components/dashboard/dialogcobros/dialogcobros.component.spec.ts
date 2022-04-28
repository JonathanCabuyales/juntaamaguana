import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcobrosComponent } from './dialogcobros.component';

describe('DialogcobrosComponent', () => {
  let component: DialogcobrosComponent;
  let fixture: ComponentFixture<DialogcobrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcobrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
