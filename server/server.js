const http = require('http');
const crypto = require('crypto');

// In-memory storage using a JavaScript Map
const itemsMap = new Map();

// Helper to send JSON responses
const sendJSON = (res, statusCode, payload) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
};

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // 1. POST /new - Create a new item
  if (method === 'POST' && url === '/new') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { x, y, text } = JSON.parse(body);

        if (x === undefined || y === undefined || text === undefined) {
          return sendJSON(res, 400, { error: 'Missing required parameters: x, y, or text' });
        }

        const id = crypto.randomUUID();
        const newItem = { x, y, text, id };

        // Save to Map in memory
        itemsMap.set(id, newItem);

        return sendJSON(res, 201, newItem);
      } catch (err) {
        return sendJSON(res, 400, { error: 'Invalid JSON body' });
      }
    });

    return;
  }

  // 2. GET /items - Retrieve all items
  if (method === 'GET' && url === '/items') {
    const allItems = Array.from(itemsMap.values());
    return sendJSON(res, 200, allItems);
  }

  // 3. GET /items/<item_id> - Retrieve a specific item by ID
  if (method === 'GET' && url.startsWith('/items/')) {
    const itemId = url.slice('/items/'.length);

    if (!itemId || !itemsMap.has(itemId)) {
      return sendJSON(res, 404, { error: 'Item not found' });
    }

    return sendJSON(res, 200, itemsMap.get(itemId));
  }

  // Fallback 404 for unhandled routes
  sendJSON(res, 404, { error: 'Route not found' });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
