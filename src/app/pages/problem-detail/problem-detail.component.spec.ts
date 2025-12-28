import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemComponent } from './problem-detail.component';

describe('ProblemComponent', () => {
  let component: ProblemComponent;
  let fixture: ComponentFixture<ProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
