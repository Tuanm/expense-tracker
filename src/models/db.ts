import { sqlite3 } from '@deps';
import { dbFile } from '@env';

const db = new sqlite3.Database(dbFile);

export default db;
