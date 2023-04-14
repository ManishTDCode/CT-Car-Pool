import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRideDashboardComponent } from './request-ride-dashboard.component';

describe('RequestRideDashboardComponent', () => {
  let component: RequestRideDashboardComponent;
  let fixture: ComponentFixture<RequestRideDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestRideDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestRideDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
