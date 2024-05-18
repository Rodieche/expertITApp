1. Clone the git repository
```
git clone https://github.com/Rodieche/expertITApp.git
```
2. Copy .env.example and paste in the same folder as .env
3. Add the environment variables in .env file  
4. Run the next commands:
```
npm install
```
```
docker compose up -d
```
5. Start the server
```
npm run dev
```
---

## Routes

#### Customers

1. Create customer
Method: POST 
uri: /api/customers
allowed body params: [
    name: string
]

2. Get all customer (paginate)
Method: GET
uri: /api/customers
allowed body params: null

3. Get customer
Method: GET
uri: /api/customers/:slug
allowed body params: null

4. Update customer
Method: PUT
uri: api/customers/:id
allowed body params: [
    name: string
]

5. Delete customer
Method: DELETE
uri: /api/customers/:id
allowed body params: null