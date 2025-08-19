import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '@services';
import { CreateOligarchComponent } from './create-oligarch.component';

describe('CreateOligarchComponent', () => {
  let component: CreateOligarchComponent;
  let fixture: ComponentFixture<CreateOligarchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOligarchComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), DataService],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOligarchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
