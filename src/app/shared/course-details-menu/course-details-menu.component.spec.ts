import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsMenuComponent } from './course-details-menu.component';

describe('CourseDetailsMenuComponent', () => {
  let component: CourseDetailsMenuComponent;
  let fixture: ComponentFixture<CourseDetailsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseDetailsMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDetailsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
