import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Project2025Component } from './project2025.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from '@services';

describe('Project2025Component', () => {
  let component: Project2025Component;
  let fixture: ComponentFixture<Project2025Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Project2025Component],
      providers: [provideHttpClient(), provideHttpClientTesting(), DataService],
    }).compileComponents();

    fixture = TestBed.createComponent(Project2025Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
