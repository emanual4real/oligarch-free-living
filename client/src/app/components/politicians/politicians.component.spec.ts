import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PoliticiansComponent } from './politicians.component';

describe('PoliticiansComponent', () => {
  let component: PoliticiansComponent;
  let fixture: ComponentFixture<PoliticiansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticiansComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(PoliticiansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
