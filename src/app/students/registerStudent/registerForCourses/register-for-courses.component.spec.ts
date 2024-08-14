import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterForCoursesComponent } from './register-for-courses.component';

describe('RegisterForCoursesComponent', () => {
  let component: RegisterForCoursesComponent;
  let fixture: ComponentFixture<RegisterForCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterForCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterForCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
