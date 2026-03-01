# API Design Guidelines

## RESTful APIs
When building RESTful APIs, always use standard HTTP methods properly: GET for reading, POST for creating, PUT for updating, and DELETE for removing resources. Ensure that you return appropriate HTTP status codes (e.g., 200 for OK, 201 for Created, 404 for Not Found, 500 for Internal Server Error).

## API Authentication
Use JWT (JSON Web Tokens) for securing modern APIs. The client should include the token in the `Authorization` header as a Bearer token (`Authorization: Bearer <token>`). Ensure tokens have an expiration time and use refresh tokens for long-lived sessions.

## Rate Limiting
To protect your API from abuse, implement Rate Limiting. A standard approach is to limit the number of requests per IP address to 100 requests per minute using algorithms like Token Bucket or Leaky Bucket.
