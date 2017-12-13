import { Component, Input } from '@angular/core';
import { TableData } from "./table.model";

@Component({
    selector: 'app-table',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent {
    @Input()
    title: string;

    @Input()
    productName: string;

    @Input()
    productOwner: string;

    @Input()
    data: TableData;

    get subtitle(): string {
      let result = "";
      if (this.productName != null) {
        result += this.productName;
      }
      if (this.productName != null && this.productOwner != null) {
        result += " w ";
      }
      if (this.productOwner != null) {
        result += this.productOwner;
      }
      return result;
    }
}
