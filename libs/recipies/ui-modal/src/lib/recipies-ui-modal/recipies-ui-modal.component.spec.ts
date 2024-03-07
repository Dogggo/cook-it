import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipiesUiModalComponent } from './recipies-ui-modal.component';

describe('RecipiesUiModalComponent', () => {
  let component: RecipiesUiModalComponent;
  let fixture: ComponentFixture<RecipiesUiModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipiesUiModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipiesUiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
