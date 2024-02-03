import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  constructor() { }

  async loadComponent(component: ComponentType, viewContainerRef: ViewContainerRef) {

    //ViewContainerRef => dinamik olarak yüklenecek componenti içerisinde barındıran containerdir. **önceki viewler clear edilmeli.***   

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
    return viewContainerRef.createComponent(_component); //ComponentFactory deprecated
  }
}


export enum ComponentType {
  BasketComponent,
  SelectProductImageDialogComponent
}
