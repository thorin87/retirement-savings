import { Component, Input } from '@angular/core';
import { TableData } from "./table.model";

@Component({
    selector: 'app-table',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent{
    @Input()
    title: string;

    @Input()
    subtitle: string;

    @Input()
    data: TableData;
}
