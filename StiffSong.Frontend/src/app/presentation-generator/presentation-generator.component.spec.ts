import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationGeneratorComponent } from './presentation-generator.component';

describe('PresentationGeneratorComponent', () => {
  let component: PresentationGeneratorComponent;
  let fixture: ComponentFixture<PresentationGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
