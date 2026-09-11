# TIMEBLOOM Architecture 🌱

## 1. Overview

TIMEBLOOM is a small full-stack web application that allows users to create accounts, plant memories and view those memories as a growing digital garden.

The system is intentionally simple.

The architecture has four main areas:

1. frontend
2. Express backend
3. database
4. external plant API

---

## 2. Architecture diagram

```text
                         ┌─────────────────────┐
                         │       USER          │
                         │      Browser        │
                         └──────────┬──────────┘
                                    │
                                    │ HTTP
                                    ▼
                    ┌───────────────────────────┐
                    │       TIMEBLOOM           │
                    │      Express Server       │
                    └─────────────┬─────────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
              ▼                   ▼                   ▼
       ┌────────────┐      ┌─────────────┐     ┌─────────────┐
       │ Auth API   │      │ Memory API  │     │ Plant API   │
       │ /api/auth  │      │ /memories   │     │ /plants     │
       └──────┬─────┘      └──────┬──────┘     └──────┬──────┘
              │                   │                   │
              │                   │                   ▼
              │                   │            ┌──────────────┐
              │                   │            │ External     │
              │                   │            │ Plant API    │
              │                   │            └──────────────┘
              │                   │
              └──────────┬────────┘
                         ▼
                 ┌─────────────────┐
                 │    Database     │
                 │ Users/Memories  │
                 └─────────────────┘
```

---

# 3. Frontend

The frontend uses:

* HTML
* CSS
* vanilla JavaScript
* Three.js

The application is split into separate pages:

```text
index.html
login.html
register.html
create.html
garden.html
memory.html
```

JavaScript is separated according to responsibility:

```text
app.js
create.js
garden.js
memory.js
```

This was chosen instead of introducing a frontend framework because the application is small enough that a framework would add complexity without solving an immediate problem.

---

# 4. Backend

The backend uses Node.js and Express.

The server is responsible for:

* serving the frontend
* handling user registration
* handling login
* saving memories
* loading memories
* retrieving plant information
* communicating with the external plant API

The main server is:

```text
backend/server.js
```

Routes are separated into:

```text
backend/routes/auth.js
backend/routes/memories.js
backend/routes/plants.js
```

This keeps the server entry point relatively small and makes each API responsibility easier to find.

---

# 5. Database

TIMEBLOOM stores user and memory information in a relational database.

The main entities are:

```text
USER
----
id
username
password
created_at


MEMORY
------
id
user_id
flower_id
flower_name
flower_image
title
memory_text
memory_date
mood
flower_fact
created_at
```

The relationship is:

```text
USER
 │
 │ 1
 │
 │
 │ many
 ▼
MEMORY
```

One user can therefore have multiple memories.

---

# 6. Why a relational database?

The memory belongs to a user.

This naturally creates a relationship between:

```text
user
```

and:

```text
memory
```

A relational database makes this relationship explicit through:

```text
user_id
```

rather than storing everything as one large JSON object.

For the size of this project, a relational database is also simple enough to understand and debug.

---

# 7. External API

TIMEBLOOM uses an external plant API to retrieve flower information.

The backend exposes:

```text
GET /api/plants
```

The backend communicates with the external service rather than exposing the API key directly to the browser.

The flow is:

```text
Browser
   ↓
TIMEBLOOM /api/plants
   ↓
External plant API
   ↓
TIMEBLOOM
   ↓
Browser
```

The API key is stored as an environment variable.

---

# 8. Failure handling

The external plant API is a dependency that TIMEBLOOM does not control.

Therefore, the application assumes that the service can fail.

Possible failures include:

* API unavailable
* timeout
* invalid response
* missing API key
* API rate limit
* HTTP error

Instead of allowing the entire create-memory flow to fail, TIMEBLOOM can use fallback flower data.

This was an intentional design decision because the Build Week requirement specifically asks the application to interact with something outside the developer's control.

---

# 9. Memory growth

A memory contains a date.

The application uses the date to calculate the memory's age.

Conceptually:

```text
memory date
     ↓
current date
     ↓
age in days
     ↓
growth stage
     ↓
visual representation
```

The visual representation therefore has a relationship to actual application data.

The flower is not simply animated randomly.

---

# 10. Authentication

User registration stores a hashed password rather than storing the raw password.

Password hashing uses Node's cryptographic functionality.

The authentication flow is:

```text
User
 ↓
Register
 ↓
Validate input
 ↓
Hash password
 ↓
Store account
```

For login:

```text
User
 ↓
Login
 ↓
Find account
 ↓
Verify password
 ↓
Authenticated user
```

A future production version would strengthen this by using a dedicated server-side session or token-based authentication system rather than relying on client-supplied user identifiers.

---

# 11. Why vanilla JavaScript?

I considered using a frontend framework but chose vanilla JavaScript.

The main reason was scope.

TIMEBLOOM contains a relatively small number of pages and interactions. Adding a framework would introduce:

* additional dependencies
* build configuration
* framework-specific concepts
* more deployment configuration

without being necessary to deliver the core idea.

This decision also allowed me to focus on learning the parts that were more relevant to this project, including the 3D experience and backend integration.

---

# 12. Decision I am least confident about

The architectural decision I am least confident about is the database choice for deployment.

SQLite was attractive because it is:

* simple
* free
* easy to run locally
* easy to understand
* sufficient for a small application

However, hosted environments can have filesystem limitations.

If TIMEBLOOM were developed beyond Build Week, I would strongly consider moving production storage to a managed PostgreSQL database.

The decision would change if:

* the application needed multiple backend instances
* the number of users increased significantly
* concurrent writes increased
* reliable cloud persistence became a requirement
* database backups became important

For the current project, simplicity and learning speed were important constraints.

---

# 13. Main trade-offs

TIMEBLOOM deliberately prioritises:

```text
simplicity
     +
explainability
     +
working product
     +
failure handling
```

over:

```text
large-scale infrastructure
complex frameworks
microservices
advanced authentication
```

This is appropriate for the Build Week scope.

---

# 14. What I would change for production

If TIMEBLOOM became a real product, I would consider:

* PostgreSQL
* proper session/token authentication
* stronger password policies
* rate limiting
* CSRF protection
* API caching
* image storage
* automated deployment tests
* structured logging
* database migrations
* monitoring
* automated backups
* accessibility improvements
* mobile-first optimisation

These were intentionally outside the first Build Week scope.
