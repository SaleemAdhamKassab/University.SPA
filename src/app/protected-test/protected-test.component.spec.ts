import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedTestComponent } from './protected-test.component';

describe('ProtectedTestComponent', () => {
  let component: ProtectedTestComponent;
  let fixture: ComponentFixture<ProtectedTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectedTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtectedTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
