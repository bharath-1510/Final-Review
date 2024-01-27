import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignQuestionComponent } from './assign-question.component';

describe('AssignCandidateComponent', () => {
  let component: AssignQuestionComponent;
  let fixture: ComponentFixture<AssignQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignQuestionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
