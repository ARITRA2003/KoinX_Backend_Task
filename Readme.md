# Crypto Data Task Documentation

This application provides an API for fetching and managing cryptocurrency data, including the latest statistics and standard deviation of prices for selected cryptocurrencies. It uses a MongoDB database to store records and supports Bitcoin, Ethereum, and Matic Network.

## Deployment Link

The API is deployed and accessible at:

[https://koinx-backend-task-1.onrender.com/](https://koinx-backend-task-1.onrender.com/)

---

## Database Model

### **CryptoCurrencyData Model**

The database model is defined using Mongoose. Each document represents a snapshot of cryptocurrency data.

| Field          | Type     | Description                                    |
|----------------|----------|------------------------------------------------|
| `_id`          | ObjectId | Unique identifier for the record              |
| `coin`         | String   | The cryptocurrency ID (e.g., "bitcoin")        |
| `price`        | Number   | The current price of the cryptocurrency       |
| `marketCap`    | Number   | The market capitalization in USD              |
| `change24h`    | Number   | The 24-hour price change percentage           |
| `createdAt`    | Date     | Timestamp of when the record was created      |

Additionally, a TTL (Time-To-Live) index is configured on the `createdAt` field to automatically delete records older than 10 days. This is done to ensure efficient storage and to prevent accumulation of outdated data. Since the primary use case for the `/deviation` endpoint involves analyzing the most recent 100 records, any data older than 10 days is unlikely to be relevant and can safely be discarded. By limiting the data lifespan to 10 days, we optimize database performance and reduce unnecessary storage usage.

---

## API Endpoints

### **1. `/api/stats`**

Fetch the latest data for a given cryptocurrency.

#### **Endpoint**
```
GET /api/stats
```

#### **Query Parameters**
| Parameter | Type   | Description                                                                 |
|-----------|--------|-----------------------------------------------------------------------------|
| `coin`    | String | The cryptocurrency ID (must be "bitcoin", "ethereum", or "matic-network"). |

#### **Example Request**
```
GET {{base-url}}/stats?coin=matic-network
```

#### **Example Response**
```json
{
    "_id": "67817fc520caab63f81b6879",
    "coin": "matic-network",
    "price": 0.460159,
    "marketCap": 884250699,
    "change24h": 3.20812,
    "__v": 0
}
```

---

### **2. `/api/deviation`**

Calculate the standard deviation of the prices for the last 100 records of a given cryptocurrency.

#### **Endpoint**
```
GET /api/deviation
```

#### **Query Parameters**
| Parameter | Type   | Description                                                                 |
|-----------|--------|-----------------------------------------------------------------------------|
| `coin`    | String | The cryptocurrency ID (must be "bitcoin", "ethereum", or "matic-network"). |

#### **Example Request**
```
GET {{base-url}}/deviation?coin=bitcoin
```

#### **Example Response**
```json
{
    "coin": "bitcoin",
    "dataCount": 6,
    "standardDeviation": "0.00"
}
```

---

## Notes

1. **TTL for Records**:
   - Records older than 10 days are automatically deleted from the database.
   - This ensures efficient storage and prevents stale data from being considered.
   - The 10-day TTL is chosen to balance the frequency of data updates (every 2 hours) and the need for up-to-date records. With data being refreshed every 2 hours, 100 records would correspond to approximately 8.33 days. A 10-day TTL provides a small buffer to ensure there are always enough records for standard deviation calculations while keeping the database clean.

2. **Supported Cryptocurrencies**:
   - Bitcoin (`bitcoin`)
   - Ethereum (`ethereum`)
   - Matic Network (`matic-network`)

3. **Cron Job**:
   - A background job fetches the latest cryptocurrency data every 2 hours and updates the database.

---

## Development Setup

1. Clone the repository.
2. Install dependencies using:
   ```bash
   npm install
   ```
3. Configure your MongoDB connection in the `.env` file.
4. Start the server:
   ```bash
   npm start
   ```

---

