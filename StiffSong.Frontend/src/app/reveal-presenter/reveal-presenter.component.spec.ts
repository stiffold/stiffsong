import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealPresenterComponent } from './reveal-presenter.component';

describe('RevealPresenterComponent', () => {
  let component: RevealPresenterComponent;
  let fixture: ComponentFixture<RevealPresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevealPresenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevealPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
