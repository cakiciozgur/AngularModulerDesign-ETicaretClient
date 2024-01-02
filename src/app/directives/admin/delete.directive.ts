import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ProductService } from '../../services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';

declare var $:any
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef, private _renderer: Renderer2, private productService: ProductService, private spinner: NgxSpinnerService)
  {
    const image = _renderer.createElement("img");
    image.setAttribute("src", "../../../../../assets/delete.png");
    image.setAttribute("style", "cursor:pointer;");
    image.width = 30;
    image.height = 30;
    _renderer.appendChild(element.nativeElement, image);
  }
  @Input() id: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onclick() {
    this.spinner.show(SpinnerType.Timer);
    const td: HTMLTableCellElement = this.element.nativeElement;
    await this.productService.delete(this.id);
    $(td.parentElement).fadeOut(2000, () => {
      this.callback.emit();
    });
  }

}
