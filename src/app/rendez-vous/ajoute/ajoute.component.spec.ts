import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteComponent } from './ajoute.component';

describe('AjouteComponent', () => {
  let component: AjouteComponent;
  let fixture: ComponentFixture<AjouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
