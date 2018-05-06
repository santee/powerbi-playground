import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerbiContainerComponent } from './powerbi-container.component';

describe('PowerbiContainerComponent', () => {
  let component: PowerbiContainerComponent;
  let fixture: ComponentFixture<PowerbiContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerbiContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerbiContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
