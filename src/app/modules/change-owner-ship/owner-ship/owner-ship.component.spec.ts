import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerShipComponent } from './owner-ship.component';

describe('OwnerShipComponent', () => {
  let component: OwnerShipComponent;
  let fixture: ComponentFixture<OwnerShipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerShipComponent]
    });
    fixture = TestBed.createComponent(OwnerShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
