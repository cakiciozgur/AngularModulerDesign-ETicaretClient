import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  async loadComponent(component: ComponentType, viewContainerRef: ViewContainerRef) {

    //ViewContainerRef => dinamik olarak yüklenecek componenti içerisinde barındıran containerdir. **önceki viewler clear edilmeli.***

    //ComponentFactory => componentlerin instance larını oluşturmak için bir nesnedir.

    //ComponentFactoryResolver => belirli bir component için component factoryi resolve eden sınıftır. içerisindeki resolveComponentFactory fonksiyonu aracılığı ile ilgili componente dair bir
    // ComponentFactory nesnesi oluşturup geriye döndürür.

    let _component: any = null;

    switch (component) {
      case ComponentType.BasketComponent:
        _component = (await import("../../ui/components/basket/basket.component")).BasketComponent;
        break;
      case ComponentType.SelectProductImageDialogComponent:
        _component = (await import("../../dialogs/select-product-image-dialog/select-product-image-dialog.component")).SelectProductImageDialogComponent;
        break;
    }

    viewContainerRef.clear();
    return viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(_component));
  }
}


export enum ComponentType {
  BasketComponent,
  SelectProductImageDialogComponent
}
