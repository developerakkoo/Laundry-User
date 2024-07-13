import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewLaundryPage } from './view-laundry.page';

describe('ViewLaundryPage', () => {
  let component: ViewLaundryPage;
  let fixture: ComponentFixture<ViewLaundryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLaundryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
