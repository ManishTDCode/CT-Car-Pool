import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewrideComponent } from './viewride.component';

describe('ViewrideComponent', () => {
  let component: ViewrideComponent;
  let fixture: ComponentFixture<ViewrideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewrideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewrideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
