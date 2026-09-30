# FlexShare

Campus peer-to-peer equipment rental and student delivery prototype for Palawan State University.

## Run

Open `index.html` directly in a modern browser, or serve this folder with any static web server. No build step or dependencies are required. The demo database is stored in the browser's `localStorage`; use **Database inspector → Reset demo database** to restore the seed records.

## Layers

- `FlexShareDB` seeds and persists the `users`, `equipment`, `rentals`, `handoffs`, `flexrunner_jobs`, and `notifications` tables.
- `FlexShareAPI` exposes asynchronous controller methods for inventory, listing creation, checkout, QR handoff verification, runner acceptance, and reset.
- `app.js` binds those services to the responsive UI in `index.html` and `styles.css`.

The GCash and Maya flows are simulated, not connected to payment providers. Seeded student accounts and school IDs are fictional. QR verification uses a generated demo token; uploaded condition photos are previewed locally and their file metadata is logged in the browser database. This is a prototype, not a production payment, identity, or image-storage system.
