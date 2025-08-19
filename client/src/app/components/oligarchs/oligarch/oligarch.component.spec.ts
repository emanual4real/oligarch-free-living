import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OligarchComponent } from './oligarch.component';

describe('OligarchComponent', () => {
  let component: OligarchComponent;
  let fixture: ComponentFixture<OligarchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OligarchComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(OligarchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
