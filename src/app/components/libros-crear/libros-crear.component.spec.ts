import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosCrearComponent } from './libros-crear.component';

describe('LibrosCrearComponent', () => {
  let component: LibrosCrearComponent;
  let fixture: ComponentFixture<LibrosCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrosCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrosCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
