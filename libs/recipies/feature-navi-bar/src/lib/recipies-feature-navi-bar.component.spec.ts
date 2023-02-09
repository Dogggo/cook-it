import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipiesFeatureNaviBarComponent } from './recipies-feature-navi-bar.component';

describe('RecipiesUiNaviBarComponent', () => {
  let component: RecipiesFeatureNaviBarComponent;
  let fixture: ComponentFixture<RecipiesFeatureNaviBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipiesFeatureNaviBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipiesFeatureNaviBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
