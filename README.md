# React Express Template

Full-stack application template for rapid prototpying or technical assessments.  Ready to test and deploy with

# Features

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

In ```.env```, configure the back-end API locations for local testing.

```bash
VITE_API_LOCATION='http://localhost'
VITE_API_PORT=3000
VITE_API_SUFFIX=/api/v1/
```

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

# Test Locally

Front-end: ```npm run dev```

Back-end: ```npm run start```

# Deployment

