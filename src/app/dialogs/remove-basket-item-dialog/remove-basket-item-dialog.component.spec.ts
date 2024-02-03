import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveBasketItemDialogComponent } from './remove-basket-item-dialog.component';

describe('RemoveBasketItemDialogComponent', () => {
  let component: RemoveBasketItemDialogComponent;
  let fixture: ComponentFixture<RemoveBasketItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveBasketItemDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveBasketItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
