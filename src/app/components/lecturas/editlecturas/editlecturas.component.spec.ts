import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlecturasComponent } from './editlecturas.component';

describe('EditlecturasComponent', () => {
  let component: EditlecturasComponent;
  let fixture: ComponentFixture<EditlecturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditlecturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditlecturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
