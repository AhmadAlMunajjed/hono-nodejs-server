import { serve } from '@hono/node-server';
import { Hono } from 'hono';
const app = new Hono();
const jsonCacheMap = new Map();
app.get('/', (c) => {
    if (jsonCacheMap.has('key')) {
        return c.text(jsonCacheMap.get('key') + ' hit!');
    }
    const value = 'Hello Hono!';
    jsonCacheMap.set('key', value);
    return c.text(value + ' missed!');
});
serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
