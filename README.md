# 🌱 TIMEBLOOM

> **Don't just remember it. Let it grow.**

TIMEBLOOM is a small interactive memory-garden web application where memories are planted as flowers and gradually grow over time.

Instead of storing memories as a simple list, TIMEBLOOM turns each memory into something visual and living. Users can create an account, plant a memory, choose a flower, and return to their private garden to watch their memories grow.

The idea is simple:

**Plant → Grow → Bloom**

A graduation, birthday, road trip, friendship, achievement or ordinary moment can become a living part of someone's digital garden.

## Why I built it

I wanted to explore a different way of thinking about personal memories. Most memory applications treat a memory as a static record:

> title + text + date

TIMEBLOOM treats time as part of the experience. The date a memory was created or happened affects how the memory is presented, allowing the garden to visually change as time passes. The project was built for Build Week.

---

## Build Week requirements

| Requirement                    | TIMEBLOOM implementation                                              |
| ------------------------------ | --------------------------------------------------------------------- |
| Something new to me            | Three.js / 3D web interaction and full-stack application architecture |
| Uses something I don't control | External plant API                                                    |
| Remembers state                | Persistent database                                                   |
| Works for more than one person | User accounts and user-specific memories                              |
| Can be run without me          | Deployed publicly on Render                                           |
| Automated test                 | Edge-case and failure-path tests                                      |
| Free only                      | Built using free/open-source tools and free hosting                   |

---

## Features

### User accounts

Users can register and log into their own TIMEBLOOM account.

Passwords are not stored as plain text. They are hashed before being stored.

### Plant a memory

A user can create a memory containing:

* memory title
* memory story
* date
* mood
* flower
* flower information

### External flower catalogue

TIMEBLOOM retrieves flower information from an external plant API.

The application does not assume that the external service will always work.

If the API fails, TIMEBLOOM uses fallback flower data so that the user can continue creating a memory.

### Personal garden

Users can view the memories associated with their account.

### Growing memories

A memory's age is calculated from its date and used to determine its growth stage.

A memory progresses from planting towards blooming as time passes.

### 3D memory experience

Three.js is used to create the interactive visual memory experience.

---

## Technology

### Frontend

* HTML5
* CSS3
* JavaScript
* Three.js

### Backend

* Node.js
* Express

### Database

* SQLite for local development
* Production datastore as described in the deployment section

### External service

TIMEBLOOM uses the **Perenual Plant API** to retrieve plant information.

This means the flower information is not completely hard-coded into the application.

The external API provides real-world plant data that is integrated into TIMEBLOOM.

If the external API does not return usable information, TIMEBLOOM uses fallback behaviour rather than allowing the entire application to fail.

Potential external API problems include:

- API rate limiting
- Missing plant information
- Invalid responses
- Network failures
- API downtime

The API key is stored as an environment variable and is **not committed to GitHub**.

### Hosting

* Render

---

## Project Structure 
```
Timebloom-Project/
│
├── backend/
│   │
│   ├── node_modules/
│   │   └── ...
│   ├── routes/
│   │   ├── auth.js
│   │   ├── memories.js
│   │   └── plants.js
│   │
│   ├── .env
│   ├── database.js
│   ├── database.sqlite
│   ├── timebloom.db
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   │
│   ├── css/
│   │   ├── create.css
│   │   ├── garden.css
│   │   ├── login.css
│   │   ├── memory.css
│   │   ├── register.css
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── app.js
│   │   ├── create.js
│   │   ├── garden.js
│   │   └── memory.js
│   │
│   └── html/
│       ├── create.html
│       ├── garden.html
│       ├── index.html
│       ├── login.html
│       ├── memory.css
│       └── register.html
│
├── node_modules/
│       └── ...
├── tests/
│   ├── index.html
│   └── test.js
│
├── .gitignore
├── ARCHITECTURE.md 
├── LOG.md 
├── package-lock.json
├── README.md
└── SIDEQUEST.md
```

# Running TIMEBLOOM locally

## Requirements

Install:

* Node.js 18+
* npm
* Git

Check your versions:

```bash
node --version
npm --version
```

---

## 1. Clone the repository

```bash
git clone https://github.com/Payal429/Timebloom-Project.git
cd Timebloom-Project
```

---

## 2. Install backend dependencies

```bash
cd backend
npm install
```

---

## 3. Configure the environment

Create:

```text
backend/.env
```

based on:

```text
backend/.env.example
```

Example:

```env
PORT=3000
PERENUAL_API_KEY=your_api_key_here
```

The API key should not be committed to Git.

---

## 4. Start the server

From the `backend` directory:

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

---

# Testing

TIMEBLOOM contains automated edge-case tests.

Open:

```text
tests/index.html
```

The tests focus on failure cases such as:

* empty memory input
* whitespace-only input
* invalid data
* external API fallback behaviour

The intention is to test what happens when things go wrong rather than only testing the happy path.

---

# External API behaviour

TIMEBLOOM depends on an external plant API for flower information.

The external service is outside my control, so the application treats it as an unreliable dependency.

The flow is:

```text
User requests flowers
        ↓
TIMEBLOOM backend
        ↓
External plant API
        ↓
   ┌────┴────┐
   │         │
Success    Failure
   │         │
   ↓         ↓
Flowers   Fallback
```

This means a temporary API failure should not prevent a user from planting a memory.

---

# Deployment

The live application is deployed on Render:

https://timebloom.onrender.com/

The application runs as a Node/Express web service.

Render starts the backend server and the backend serves the frontend application.

---

# Known limitations

TIMEBLOOM was intentionally scoped as a Build Week project.

Known limitations include:

* the external plant API may become unavailable
* the free hosting environment may experience cold starts
* the application is not intended to be a production-scale social platform
* image storage and advanced media management are outside the current scope

These limitations are documented rather than hidden because the goal of Build Week is to demonstrate engineering decisions and trade-offs.

---

# AI usage

AI was used throughout development as a development assistant.

It helped with:

* generating initial implementation ideas
* explaining unfamiliar APIs
* debugging
* improving UI interactions
* suggesting test cases
* reviewing implementation decisions
* documentation structure

AI-generated code was not treated as automatically correct.

Code was tested manually and through automated tests, and incorrect suggestions were changed or rejected when they did not match the actual application.

More detail is documented in `LOG.md`.

---

# Side quest

See:

```text
SIDEQUEST.md
```

This documents a separate tool/library that I investigated but did not use in TIMEBLOOM.

---

# Build Week

Built for:

**Build Week — Ship something small, weird, and yours.**

The project intentionally prioritised:

1. a complete working idea
2. persistence
3. failure handling
4. explainable architecture
5. a deployable experience

rather than trying to build a large production system in one week.
