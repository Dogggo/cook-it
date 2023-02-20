import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipiesUtilsConfigComponent } from './recipies-utils-config.component';

describe('RecipiesUtilsConfigComponent', () => {
  let component: RecipiesUtilsConfigComponent;
  let fixture: ComponentFixture<RecipiesUtilsConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipiesUtilsConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipiesUtilsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
