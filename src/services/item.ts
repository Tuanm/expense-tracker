import { Item } from '@models';

export function add(name: string, cost: number) {
    if (name && cost) {
        Item.insertOne({
            name,
            cost,
        });
    } else {
        throw new Error('illegal arguments');
    }
}

export function searchByName(name: string, page: number, size: number) {
    const total = Item.countByName(name);
    const data = total ? Item.findByName(name, page, size) : [];
    return {
        data,
        total,
    };
}

export function search(page: number, size: number) {
    const total = Item.countAll();
    const data = total ? Item.findAll(page, size) : [];
    return {
        data,
        total,
    };
}
