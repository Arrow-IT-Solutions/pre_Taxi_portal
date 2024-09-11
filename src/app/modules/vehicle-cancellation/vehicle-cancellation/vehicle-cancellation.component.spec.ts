import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCancellationComponent } from './vehicle-cancellation.component';

describe('VehicleCancellationComponent', () => {
  let component: VehicleCancellationComponent;
  let fixture: ComponentFixture<VehicleCancellationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleCancellationComponent]
    });
    fixture = TestBed.createComponent(VehicleCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
