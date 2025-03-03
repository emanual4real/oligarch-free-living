import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticiansComponent } from './politicians.component';

describe('PoliticiansComponent', () => {
  let component: PoliticiansComponent;
  let fixture: ComponentFixture<PoliticiansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticiansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticiansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
