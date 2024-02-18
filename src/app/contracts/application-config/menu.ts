export class Menu {
  name: string;
  actions: Action[];
}

export class Action {
  actionTpye: string;
  httpType: string;
  definition: string;
  code: string;
}
