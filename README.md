# Flash Sales

## Use case: **Managing "Flash Sales" (Inventory Hoarding):**

- _Scenario:_ You are selling Taylor Swift tickets. Scalper bots hit the "Buy" endpoint instantly, locking the database row.
- _The Fix:_ Queue-based rate limiting. Only allow X users per second to enter the "Checkout" flow.
