import { GroupItem } from '../data.iterators';
import { ColumnsContainer } from '../columns-container';
import { GroupDescriptor } from '@progress/kendo-data-query';
/**
 * @hidden
 */
export declare class GroupInfoService {
    private _columnsContainer;
    private readonly columns;
    registerColumnsContainer(columns: ColumnsContainer): void;
    formatForGroup(item: GroupItem | GroupDescriptor): string;
    groupTitle(item: GroupItem | GroupDescriptor): string;
    groupHeaderTemplate(item: GroupItem | GroupDescriptor): any;
    private groupField(group);
    private columnForGroup(group);
}
