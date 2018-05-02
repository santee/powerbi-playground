import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerbiHostComponent } from './powerbi-host.component';

describe('PowerbiHostComponent', () => {
  let component: PowerbiHostComponent;
  let fixture: ComponentFixture<PowerbiHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerbiHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerbiHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
