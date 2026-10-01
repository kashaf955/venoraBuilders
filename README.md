# Venora Builders

Marketing site for Venora Builders (SMC-PVT) Ltd. React frontend, Express API, MongoDB when configured.

## Pages

- Home
- About Us
- Our Services
- Our Projects
- Construction calculator
- Contact Us

## Run locally

```bash
npm install
npm install --prefix server
npm install --prefix client
npm run dev
```

Open http://localhost:5173. The API runs on port 5000 and Vite proxies `/api`.

Without `MONGODB_URI`, contact and calculator inquiries are saved to `server/data/inquiries.json`.

## MongoDB

Copy `server/.env.example` to `server/.env` and set a MongoDB Atlas connection string:

```
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/venora
```

## Production

```bash
npm run build
npm start
```

Express serves `client/dist` and the API from one process.
