import { escapeLikeWildcards, repeat } from '@utils';
import db from './db.ts';

export type Item = {
    id?: number;
    name: string;
    cost?: number;
    at?: number;
};

export function createTable() {
    db.exec(`create table if not exists item (
        id integer primary key autoincrement,
        name varchar(200) not null,
        cost decimal not null default 0,
        at timestamp not null default current_timestamp
    )`);
}

export function countByName(name: string) {
    const statement = db.prepare(
        'select count(*) as total from item where name like :name',
    );
    return statement.get<{ total: number }>({ name })?.total;
}

export function findByName(name: string, page: number, size: number) {
    const statement = db.prepare(
        'select * from item where name like :name limit :limit offset :offset',
    );
    return statement.all<Item>({
        name: '%' + escapeLikeWildcards(name) + '%',
        limit: size,
        offset: page * size,
    });
}

export function countAll() {
    const statement = db.prepare(
        'select count(*) as total',
    );
    return statement.get<{ total: number }>()?.total;
}

export function findAll(page: number, size: number) {
    const statement = db.prepare(
        'select * from item limit :limit offset :offset',
    );
    return statement.all<Item>({
        limit: size,
        offset: page * size,
    });
}

export function insertOne(item: Item) {
    const statement = db.prepare(
        'insert into item (name, cost) values (:name, :cost)',
    );
    db.transaction((value: Item) => {
        statement.run(value);
    })(item);
}

export function insertMany(items: Item[]) {
    const sql = 'insert into item (name, cost) values ' +
        repeat(['(?, ?)'], items.length).join(', ');
    const statement = db.prepare(sql);
    db.transaction((values: Item[]) => {
        statement.run(values.map((value) => [value.name, value.cost]).flat());
    })(items);
}
