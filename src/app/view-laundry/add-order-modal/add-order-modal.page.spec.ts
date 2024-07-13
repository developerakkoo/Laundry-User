import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOrderModalPage } from './add-order-modal.page';

describe('AddOrderModalPage', () => {
  let component: AddOrderModalPage;
  let fixture: ComponentFixture<AddOrderModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrderModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
