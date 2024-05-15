import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryChartsComponentComponent } from './category-charts-component.component';

describe('CategoryChartsComponentComponent', () => {
  let component: CategoryChartsComponentComponent;
  let fixture: ComponentFixture<CategoryChartsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryChartsComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryChartsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
