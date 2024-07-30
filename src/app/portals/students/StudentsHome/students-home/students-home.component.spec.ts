import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsHomeComponent } from './students-home.component';

describe('StudentsHomeComponent', () => {
  let component: StudentsHomeComponent;
  let fixture: ComponentFixture<StudentsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
