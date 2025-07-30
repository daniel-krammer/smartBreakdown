import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmartBreakdownAppComponent } from './smart-breakdown-app.component';

describe('SmartBreakdownAppComponent', () => {
  let component: SmartBreakdownAppComponent;
  let fixture: ComponentFixture<SmartBreakdownAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartBreakdownAppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SmartBreakdownAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
}); 