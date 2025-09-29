import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '@services';
import { ModifyOligarchComponent } from './modify-oligarch.component';

describe('CreateOligarchComponent', () => {
  let component: ModifyOligarchComponent;
  let fixture: ComponentFixture<ModifyOligarchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyOligarchComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), DataService],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyOligarchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
