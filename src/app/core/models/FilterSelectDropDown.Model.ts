import { Workspace } from './WorkspaceModel';

export class Item  {
    code: string;
    name: string;
    constructor(id: string, value: string, text: string) {
        this.name = text;
        this.code = value;
    }
}


export class Items {
   items: Item[] = new Array<Item>();
   constructor(itemList?: Item[]) {
    if (itemList) {
        this.items = itemList;
        }
    }
    add(item: Item) {
        this.items.push(item);
    }
}



export class FilteredDropDown {
    private items: Items;

    setItemsByWorkspaces(workspaces: Workspace[]) {
        const itemList = Array<Item>();
        for (let i = 0; i < workspaces.length; i++) {
            const tempItem = new Item(workspaces[i].Id, workspaces[i].Id, workspaces[i].Name );
            itemList.push(tempItem);
        }
        this.items = new Items(itemList);
    }


    getItems(): Item[] {
        return this.items.items;
    }
}

