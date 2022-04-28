import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcrearprefacComponent } from './dialogcrearprefac.component';

describe('DialogcrearprefacComponent', () => {
  let component: DialogcrearprefacComponent;
  let fixture: ComponentFixture<DialogcrearprefacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcrearprefacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcrearprefacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
