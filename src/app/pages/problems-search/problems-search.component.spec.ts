import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemsSearchComponent } from './problems-search.component';

describe('ProblemsComponent', () => {
  let component: ProblemsSearchComponent;
  let fixture: ComponentFixture<ProblemsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemsSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProblemsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
