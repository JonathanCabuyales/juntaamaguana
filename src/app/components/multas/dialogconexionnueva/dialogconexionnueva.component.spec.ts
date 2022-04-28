import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogconexionnuevaComponent } from './dialogconexionnueva.component';

describe('DialogconexionnuevaComponent', () => {
  let component: DialogconexionnuevaComponent;
  let fixture: ComponentFixture<DialogconexionnuevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogconexionnuevaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogconexionnuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
