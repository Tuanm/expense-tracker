/**
 * HTTP-serving port.
 */
export const port = Number(Deno.env.get('PORT')) || 8000;

/**
 * Database file.
 */
export const dbFile = Deno.env.get('DB_FILE') || '.db';
