import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifierPanierComponent } from './verifier-panier.component';

describe('VerifierPanierComponent', () => {
  let component: VerifierPanierComponent;
  let fixture: ComponentFixture<VerifierPanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifierPanierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifierPanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
