import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinConsoleComponent } from './win-console.component';

describe('WinConsoleComponent', () => {
  let component: WinConsoleComponent;
  let fixture: ComponentFixture<WinConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinConsoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WinConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
