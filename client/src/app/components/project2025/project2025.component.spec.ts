import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Project2025Component } from './project2025.component';

describe('Project2025Component', () => {
  let component: Project2025Component;
  let fixture: ComponentFixture<Project2025Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Project2025Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Project2025Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
