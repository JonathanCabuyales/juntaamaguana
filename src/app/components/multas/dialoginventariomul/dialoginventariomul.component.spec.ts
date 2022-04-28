import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoginventariomulComponent } from './dialoginventariomul.component';

describe('DialoginventariomulComponent', () => {
  let component: DialoginventariomulComponent;
  let fixture: ComponentFixture<DialoginventariomulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialoginventariomulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoginventariomulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
