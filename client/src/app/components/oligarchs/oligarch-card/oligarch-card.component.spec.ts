import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OligarchCardComponent } from './oligarch-card.component';

describe('OligarchCardComponent', () => {
  let component: OligarchCardComponent;
  let fixture: ComponentFixture<OligarchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OligarchCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OligarchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
