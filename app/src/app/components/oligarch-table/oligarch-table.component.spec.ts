import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OligarchTableComponent } from './oligarch-table.component';

describe('OligarchTableComponent', () => {
  let component: OligarchTableComponent;
  let fixture: ComponentFixture<OligarchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OligarchTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OligarchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
