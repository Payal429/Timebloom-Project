# TIMEBLOOM Development Log 🌱

This is the honest development log for TIMEBLOOM.

It records how the idea developed, the technical decisions I made, where AI helped me, where I had to question AI-generated suggestions, debugging, mistakes, lessons learned and what I would improve if I had more time.

---

# 1. Starting Point

The original idea behind TIMEBLOOM was based on a simple question:

> **What if memories could grow like plants?**

I did not want to build another application where a user simply creates a text entry and stores it in a database.

Instead, I wanted the date of a memory to have a visual meaning.

The idea was that a user could plant a flower for an important moment in their life, such as:

* graduating
* going on a holiday
* starting a new job
* celebrating a birthday
* achieving a personal goal
* spending time with friends or family

The memory would then become a plant.

As time passes, the plant changes its growth stage.

The basic concept became:

```text
Memory created
      ↓
   🌱 Planted
      ↓
   🌿 Growing
      ↓
   🌷 Blooming
      ↓
   🌸 Bloomed
```

This was the part of the idea I wanted to keep at the centre of the project.

The first version was mainly focused on the visual concept. As I developed it, I realised that I needed more than a visual demo if I wanted it to feel like a real application.

The project therefore grew into a small full-stack application containing:

* user registration
* login
* persistent memories
* an external plant API
* individual user gardens
* date-based plant growth
* a 3D/animated visual experience
* automated tests
* deployment

One of my biggest lessons was that adding the main feature is often easier than making all of the surrounding pieces reliable.

The idea sounds simple:

> **Plant a memory and watch it grow.**

But making that idea work required decisions about databases, APIs, authentication, state, deployment, failures and testing.

---

# 2. Where AI Genuinely Helped

AI was useful throughout the project, particularly because there were parts of the stack that I was still learning.

I did not use AI as a replacement for understanding the project. I used it mainly to accelerate exploration, generate starting points and help me investigate problems.

## Backend Structure

One area where AI helped was thinking through how to structure the backend.

Instead of putting everything into one large server file, I separated the functionality into different areas:

```text
backend/
│
├── server.js
├── database.js
│
└── routes/
    ├── auth.js
    ├── memories.js
    └── plants.js
```

This gave the application a clearer separation between:

* starting the server
* database setup
* authentication
* memories
* external plant data

AI helped me understand possible ways of organising these responsibilities and why separating routes can make a project easier to maintain.

I still had to adapt the suggestions to the actual project and test that everything worked together.

---

## Debugging

AI was also useful when something did not behave as expected.

Rather than immediately changing code, I could describe the symptom and ask for possible causes.

This gave me a list of things to investigate.

For example, instead of assuming that a problem was caused by one particular function, I could consider whether the issue was coming from:

```text
Frontend
   ↓
Fetch request
   ↓
Express route
   ↓
Database
   ↓
Response
   ↓
Frontend rendering
```

This changed the way I approached debugging.

I became more comfortable breaking a problem into smaller parts and testing each layer independently.

---

## External APIs

AI helped me understand how to structure requests to an external API and how to deal with different responses.

This was particularly useful because the plant data is not controlled by TIMEBLOOM.

The application therefore needed to consider more than just the successful response.

I had to think about:

```text
Successful API
API unavailable
Invalid response
Missing API key
Network error
```

This led to the fallback behaviour in TIMEBLOOM.

---

## Documentation

AI also helped me identify documentation that was missing.

For example, it helped me think about questions such as:

* How does the application work?
* What technologies are being used?
* How does the database relate to the frontend?
* What happens when the external API fails?
* How should another person run the application?
* What are the current limitations?

The important part for me was that I did not simply treat generated documentation as automatically correct.

I used it as a checklist and then adapted it to the actual project.

---

# 3. Where AI Confidently Lied to Me

One of the most important lessons I learned was that AI can give an answer that sounds completely reasonable while still being wrong for the environment in which the application is running.

The clearest example was database persistence.

Locally, TIMEBLOOM uses SQLite.

When I run the application locally, the database file exists and the data remains available when the application is stopped and started again.

It was therefore easy to assume:

```text
SQLite database file
        ↓
Saved in project
        ↓
Restart application
        ↓
Data still exists
```

However, deployment changes the situation.

A cloud hosting environment does not necessarily treat its local filesystem in the same way as my Windows development machine.

This meant that I needed to investigate the actual hosting environment rather than assuming that local behaviour automatically represented production behaviour.

The lesson was:

> **"Works locally" is not the same as "works in production."**

This was probably the most valuable lesson I learned about using AI during the project.

AI can provide a technically plausible answer, but that answer still needs to be verified.

Going forward, I would verify important suggestions against:

* official documentation
* the actual source code
* runtime behaviour
* tests
* deployment configuration

I learned that confidence in an answer is not evidence that the answer is correct.

---

# 4. The Bug That Cost Me the Most Time

The most frustrating problems during development were not necessarily large programming errors.

They were problems where one part of the application appeared to work while another part of the application was not behaving as expected.

The most useful debugging lesson came from following the complete path of data instead of assuming that the problem was in the UI.

For a memory, the data has to travel through several stages:

```text
User creates memory
       ↓
Frontend collects form data
       ↓
Fetch request
       ↓
Express memory route
       ↓
User lookup
       ↓
SQLite database
       ↓
Database response
       ↓
Frontend receives response
       ↓
Garden displays memory
```

When something goes wrong, changing the frontend immediately is not necessarily the answer.

I learned to check the evidence at each stage.

For example:

```text
Did the form contain the correct values?
        ↓
Was the request actually sent?
        ↓
Did the backend receive the request?
        ↓
Did the database insert succeed?
        ↓
Did the API return the expected response?
        ↓
Did the frontend use the returned data correctly?
```

This changed the way I think about debugging.

My initial instinct was often:

> "What code should I change?"

A better question became:

> **"What evidence would prove or disprove each possible cause?"**

That approach made debugging much more systematic.

---

# 5. External API Failure

One of the Build Week requirements was that the application should touch something outside my control.

For TIMEBLOOM, I chose an external plant API.

This allowed the user to choose from real plant information instead of having the entire catalogue hardcoded into the application.

However, using an external API introduces a problem:

> **What happens when the API doesn't work?**

The naive implementation would be:

```text
Plant request
     ↓
External API
     ↓
API fails
     ↓
Application fails
```

I did not want the entire memory garden to become unusable just because an external service was temporarily unavailable.

TIMEBLOOM therefore uses fallback behaviour.

The intended flow is:

```text
              Plant request
                   ↓
             External API
                   ↓
             ┌─────┴─────┐
             │           │
            OK          FAIL
             │           │
             ↓           ↓
          Real data   Fallback
             │           │
             └─────┬─────┘
                   ↓
              TIMEBLOOM
```

This became an important design decision because it changed the way I thought about reliability.

An external dependency is useful, but I should not assume that it will always be available.

This is also something I would demonstrate during the Build Week presentation because it shows that the application has been designed for failure rather than only for the perfect case.

---

# 6. What I Learned About Scope

One of the biggest challenges was resisting the temptation to keep adding features.

Once I had the basic concept working, it was easy to imagine additional functionality.

Some of the ideas I considered included:

* more animations
* more flowers
* more memory categories
* social sharing
* public profiles
* richer user profiles
* additional 3D scenes
* AI-generated memories
* notifications
* more interactive garden features

The problem was that every additional feature created more things that needed to work.

I eventually had to distinguish between:

```text
Interesting
```

and:

```text
Necessary for a working product
```

Build Week changed how I think about scope.

A smaller application where the main idea works is more valuable than a large application containing several unfinished features.

For TIMEBLOOM, the central idea is:

> **Memories grow over time.**

Everything else should support that idea.

This helped me decide what to leave out.

---

# 7. What I Still Don't Fully Understand

There are still parts of the project that I understand well enough to use but would like to understand more deeply.

One of them is the full lifecycle of a deployed application.

I understand the basic flow:

```text
GitHub
   ↓
Render
   ↓
Node / Express
   ↓
Frontend + API
   ↓
Database / External API
```

However, I would like to understand more deeply what happens behind the scenes when a production application handles:

* process restarts
* filesystem persistence
* database connections
* concurrent requests
* deployment replacement
* scaling
* application failures
* environment variables
* cloud infrastructure

I also want to understand production database architecture more deeply.

SQLite was a good choice for getting the application working locally because it is simple and requires very little setup.

However, a production application with multiple users would benefit from a managed database designed for a hosted environment.

This is an area I would investigate further rather than pretending I already understand every production infrastructure decision.

---

# 8. Security Lessons

The first version of the authentication system focused on getting registration and login working.

While reviewing the architecture, I identified an important weakness.

The memory routes rely too heavily on a username supplied by the client.

That means that although the application has registration and login functionality, the identity of the user should not ultimately be trusted simply because the browser sends a username.

A stronger implementation would use a server-issued session or token.

The server could then determine:

```text
Authenticated user
       ↓
Server identifies user
       ↓
Retrieve only that user's memories
```

rather than relying on:

```text
Browser says:
"I am user X."
       ↓
Server trusts it
```

This was a useful lesson because it showed me that **authentication and authorization are not exactly the same thing**.

An application can appear to have a login system while still having weaknesses in how access to data is enforced.

If TIMEBLOOM were developed further, this would be one of the first areas I would strengthen.

---

# 9. What I Would Do With Another Week

If I had another week, I would not simply add more visual effects.

My priority would be making the application more reliable and production-ready.

## 1. Strengthen Authentication

I would replace the reliance on client-supplied identity with proper authenticated sessions or tokens.

The server should determine which user is making the request.

---

## 2. Improve Production Persistence

I would move the production database to a managed persistent database and introduce a proper migration strategy.

SQLite would still be useful for local development, but the production environment should use storage designed for hosted applications.

---

## 3. Improve Testing

The current tests cover some basic application logic.

With more time, I would add API-level tests covering:

* successful registration
* duplicate registration
* invalid registration
* successful login
* incorrect password
* memory creation
* memory retrieval
* invalid memory input
* unauthorised access
* external API failure
* fallback behaviour

I would also deliberately test failure cases rather than focusing only on successful inputs.

---

## 4. Improve Accessibility

I would test TIMEBLOOM more thoroughly using:

* keyboard navigation
* reduced-motion settings
* screen readers
* mobile screen sizes
* colour contrast
* accessible buttons and labels

The 3D and animation elements should enhance the experience rather than make the application difficult to use.

---

## 5. Improve the Memory Experience

I would expand the central memory concept with features such as:

* a memory timeline
* richer growth stages
* better mobile 3D interaction
* optional photographs
* improved transitions
* interactive plant information
* plant facts and personality

One feature I particularly like is allowing a user to click on their flower and meet the real plant behind the memory.

For example:

```text
🌻 Meet your Sunflower

Helianthus annuus

☀️ Full sunlight
💧 Moderate water

FUN FACT:
Young sunflowers can track the sun.

Your flower's opinion:
"I spend my entire day chasing sunlight.
It's basically my personality."

🌱 119 days growing
```

This would connect the external API data to the emotional memory experience instead of using the API simply as a technical requirement.

---

# 10. What I Deliberately Did Not Build

I deliberately did not build:

* a social network
* comments
* messaging
* public profiles
* payment functionality
* complicated AI features
* large recommendation systems
* unnecessary account customisation
* a large-scale notification system

These features could make the application sound bigger, but they would also increase the risk of delivering something incomplete.

I wanted to demonstrate that I could take an idea, turn it into a working product and make deliberate decisions about what **not** to build.

The goal was not to create a massive platform.

The goal was to create a coherent product with a clear identity.

---

# 11. How AI Was Used in the Project

AI was part of the development process, but it did not replace the development process.

I used AI for:

* brainstorming
* exploring unfamiliar technologies
* generating starting points for code
* debugging ideas
* explaining errors
* improving documentation
* thinking through architecture
* identifying potential weaknesses

I also learned that AI-generated code still needs to be understood and tested.

There were times when a generated suggestion looked correct but did not fully match the actual application.

That meant I had to:

```text
AI suggestion
      ↓
Read it
      ↓
Understand it
      ↓
Compare it with my code
      ↓
Test it
      ↓
Keep / modify / reject it
```

The most important lesson was that using AI effectively does not mean accepting everything it produces.

It means being able to question it.

---

# 12. Biggest Technical Lesson

The biggest technical lesson I took from TIMEBLOOM is that a feature does not exist in isolation.

For example, "plant a memory" sounds like one feature.

In reality, it involves:

```text
Frontend form
      ↓
Validation
      ↓
HTTP request
      ↓
Authentication
      ↓
Backend route
      ↓
Database
      ↓
External plant information
      ↓
Growth calculation
      ↓
Frontend state
      ↓
Visual representation
```

A change in one part can affect several other parts.

This made me start thinking about applications as systems rather than individual pieces of code.

---

# 13. Another Week: What I Would Explore

If I had another week specifically for experimentation, I would like to explore a technology that I did not use in the main implementation.

One possible direction would be React.

TIMEBLOOM currently uses HTML, CSS and vanilla JavaScript.

That was a deliberate choice because the application was small enough that I could understand the full flow without introducing a large frontend framework.

However, React could become useful if the application developed into a much more complex interactive garden.

I would compare:

```text
Vanilla JavaScript
        vs
React
```

based on:

* component reuse
* state management
* rendering
* project complexity
* development speed
* maintainability

The important thing would not be choosing the "better" technology in general. It would be understanding **which tool is appropriate for which problem**.

---

# 14. Unknowns

There are still several questions I would investigate if TIMEBLOOM continued.

These include:

### Production persistence

What is the best free persistent database option for a small application?

### Authentication

What is the simplest secure authentication approach for a small full-stack application?

### Scaling

At what point would the current architecture stop being appropriate?

### External APIs

How should API caching and rate limiting be handled if the number of users increases?

### Testing

How much automated test coverage is appropriate for a small project?

### 3D performance

How can I keep the visual experience interesting without making the application slow on lower-end devices?

### Accessibility

How can the 3D experience remain meaningful for users who prefer reduced motion or cannot interact with complex visual effects?

These are questions I now know I should investigate rather than simply make assumptions about.

---

# 15. Final Reflection

The most valuable part of building TIMEBLOOM was not learning one specific library.

It was learning how many decisions are hidden behind a simple product idea.

The idea sounds simple:

> **"Plant a memory and watch it grow."**

But implementing that idea required decisions about:

* users
* data
* databases
* APIs
* API failures
* authentication
* authorisation
* persistence
* deployment
* testing
* frontend state
* animation
* accessibility
* scope

That was the part of Build Week I found most valuable.

I also learned that development is not simply:

```text
Write code
     ↓
It works
     ↓
Finished
```

It is much closer to:

```text
Idea
 ↓
Build
 ↓
Test
 ↓
Break
 ↓
Investigate
 ↓
Fix
 ↓
Question assumptions
 ↓
Improve
 ↓
Document
```

TIMEBLOOM is not a production-scale platform and I do not want to pretend that it is. It is a small product that I can explain, demonstrate, debug and continue improving. More importantly, I can explain **why I made the decisions I made**, where the application has weaknesses and what I would change next. That is probably the biggest thing I am taking away from Build Week. I started with a simple idea about memories and flowers.
I finished with a better understanding of what it actually takes to turn an idea into a working application.
