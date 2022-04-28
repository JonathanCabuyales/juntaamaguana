import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcobradasComponent } from './dialogcobradas.component';

describe('DialogcobradasComponent', () => {
  let component: DialogcobradasComponent;
  let fixture: ComponentFixture<DialogcobradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcobradasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcobradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
