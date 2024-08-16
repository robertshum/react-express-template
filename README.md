# React Express Template

Full-stack application template for rapid prototpying or technical assessments.  Ready to test and deploy as-is.

# Features

- CRUD operation on a Pizza entity.
- Login/Logout users stored in react context.
- Schema + Form validation.
- Encrypted stored passwords w/ bcrypt.

# Configuration

## Front-end:

In ```vite.config.js```, base URL or public path can be set if the default domain name is not used.  

Ex: https://robertshum.github.io/react-express-template/

```js
export default defineConfig({
  plugins: [react()],
  base: '/react-express-template',
})
```

In ```.env```, configure the location of the API for local testing.

```bash
VITE_API_LOCATION='http://localhost'
VITE_API_PORT=3000
VITE_API_SUFFIX=/api/v1/
```

## Back-end:

In ```.env```, configure the server port for node/express.

```bash
PORT=3000
```

Manually add users by adding another record, increment the ```_id``` and ```lastUserId``` count.

# Stack

## Front-end
- React
  - React Hook Forms
  - Context
  - React Router
- TailwindCSS
- DaisyUI
- Vite Bundler

## Back-end
- Node
- Express
- Pino (Logging)
- Swagger/OpenAPI ()
- bcrypt (Password encryption)
- In-memory storage (Temp JSON data storage)

# Running Locally

## Starting the project

Front-end: ```npm run dev```

Back-end: ```npm run start```

Default user credentials:

email: ```user@example.com``` password: ```123```

## Swagger

Deployed on: ```http://localhost:3000/api/docs/#/```

To test the API using swagger, you will have to authorize with a bearer token found from the user in the in-memory database: ```db.json```.

1. Click on the authorize button in top right corner.
2. Paste the bearer token found from the user.
3. Test API as normal.

# Deployment

My personal setup is using GitHub pages to deploy the front-end and Render (Free tier) to host the API on a VM.

Environment variables are injected into the application from the cloud rather than .env found locally.

**Pro tip:** use cron jobs to wake the Render VM up every 12m so it doesn't idle.  Spin up time takes 1m.  As of time of writing, it spins down after 15m of no activity with 750h of monthly free uptime.

## Render Environment Variables

- ```PORT``` (How the outside will interact with the API.  Default is 3000)

## Github Environment Secrets (CI/CD)

- ```VITE_API_LOCATION``` (Location of the back-end URL)  
  Ex: ```https://react-express-template.onrender.com```
- ```VITE_API_SUFFIX``` (API and version number.  Ex: ```/api/v1/```)



