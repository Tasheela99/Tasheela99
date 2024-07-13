import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioContextComponent } from './portfolio-context.component';

describe('PortfolioContextComponent', () => {
  let component: PortfolioContextComponent;
  let fixture: ComponentFixture<PortfolioContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioContextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
