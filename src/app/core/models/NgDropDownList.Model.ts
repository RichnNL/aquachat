import { Workspace } from './WorkspaceModel';

export class Item  {
    id: string;
    value: string;
    text: string;
    constructor(id: string, value: string, text: string) {
        this.id = id;
        this.value = value;
        this.text = text;
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

class Group {
    group: string;
    items: Item[];
}

class Groups {
    groups: Group[];
}

export class NgDropList {
    private items: Items;
    private groups: Groups;

    setItemsByWorkspaces(workspaces: Workspace[]) {
        const itemList = Array<Item>();
        for (let i = 0; i < workspaces.length; i++) {
            const index = (i + 1).toString();
            const tempItem = new Item(index, workspaces[i].Id, workspaces[i].Name );
            itemList.push(tempItem);
        }
        this.items = new Items(itemList);
    }


    getItems(): Item[] {
        return this.items.items;
    }
}

