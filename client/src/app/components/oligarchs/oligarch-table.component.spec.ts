import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '@services';
import { OligarchTableComponent } from './oligarch-table.component';

describe('OligarchTableComponent', () => {
  let component: OligarchTableComponent;
  let fixture: ComponentFixture<OligarchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OligarchTableComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), DataService],
    }).compileComponents();

    fixture = TestBed.createComponent(OligarchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
