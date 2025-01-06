<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>E-commerce API Documentation</title>
</head>
<body>
  <h1>E-commerce API</h1>
  <h2>Overview</h2>
  <p>This is an E-commerce API built with <strong>Express.js</strong>, providing various routes for users to interact with products, orders, and authentication. It also includes Swagger UI for easy API documentation and testing.</p>

  <h2>Setup and Installation</h2>
  <ol>
    <li><strong>Clone the repository</strong>:
      <pre>git clone &lt;https://github.com/asim093/hackhathon.git&gt;</pre>
    </li>
    <li><strong>Install dependencies</strong>:
      <pre>npm install</pre>
    </li>
    <li><strong>Environment Variables</strong>:
      <p>Make sure to set up your environment variables by creating a <code>.env</code> file in the root of your project with the following configuration:</p>
      <pre>
PORT=3000
JWT_SECRET_KEY=&lt;your-secret-key&gt;
MONGODB_URI=&lt;your-mongodb-uri&gt;
CLOUDINARY_API_KEY=&lt;your-cloudinary-api-key&gt;
CLOUDINARY_API_SECRET=&lt;your-cloudinary-api-secret&gt;
CLOUD_NAME=&lt;your-cloud-name&gt;
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=&lt;your-email&gt;
EMAIL_PASS=&lt;your-email-password&gt;
      </pre>
    </li>
    <li><strong>Start the server</strong>:
      <pre>npm start</pre>
      <p>The server will be running on <code>http://localhost:3000</code>.</p>
    </li>
  </ol>

  <h2>API Documentation</h2>
  <p>To test the API, navigate to the Swagger UI documentation provided by this API:</p>
  <ul>
    <li><strong>Swagger UI</strong>:<br> 
      Once the server is running, visit the following URL to view and test the API:
      <pre>http://localhost:3000/api-docs</pre>
    </li>
  </ul>
  <p>The <strong>Swagger UI</strong> will display interactive documentation where you can explore and test various API endpoints like:</p>
  <ul>
    <li>User authentication (<code>/auth</code> routes)</li>
    <li>Product management (<code>/product</code> routes)</li>
    <li>Order management (<code>/order</code> routes)</li>
  </ul>

  <h2>CORS</h2>
  <p>This API supports cross-origin requests, and the following origins are allowed:</p>
  <ul>
    <li><code>http://localhost:5173</code> (for local development)</li>
    <li><code>https://keen-sheba-asim-1b80dbd7.koyeb.app</code> (for production deployment)</li>
  </ul>

  <h2>Routes</h2>
  <h3>1. Authentication Routes</h3>
  <ul>
    <li><strong>POST /auth/login</strong> - Log in a user or admin.</li>
    <li><strong>POST /auth/register</strong> - Register a new user.</li>
  </ul>

  <h3>2. Product Routes</h3>
  <ul>
    <li><strong>GET /product</strong> - Fetch all products.</li>
    <li><strong>POST /product</strong> - Add a new product (Authenticate User only).</li>
    <li><strong>PUT /product/:id</strong> - Update a product (Authenticate User only).</li>
    <li><strong>DELETE /product/:id</strong> - Delete a product (Authenticate User only).</li>
  </ul>

  <h3>3. Order Routes</h3>
  <ul>
    <li><strong>GET /order</strong> - Fetch all orders.</li>
    <li><strong>POST /order</strong> - Create a new order.</li>
  </ul>

  <h2>Testing the API</h2>
  <p>You can use <strong>Swagger UI</strong> to test the API directly in the browser. The Swagger documentation is available at:</p>
  <pre>http://localhost:3000/api-docs</pre>
  <p>Open the link in your browser.</p>
  <p>The Swagger UI will display a list of available API routes with options to test each one.</p>
  <p>For routes that require authentication, ensure you provide a valid <strong>JWT token</strong> in the Authorization header.</p>

  <h2>Deployment</h2>
  <p>This API is deployed on <strong>Koyeb</strong>. You can access the deployed version via:</p>
  <ul>
    <li><strong>Production URL</strong>:  
      <a href="https://keen-sheba-asim-1b80dbd7.koyeb.app" target="_blank">https://keen-sheba-asim-1b80dbd7.koyeb.app</a>
    </li>
  </ul>

</body>
</html>
