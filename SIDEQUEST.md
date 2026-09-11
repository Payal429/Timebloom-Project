# Side Quest — React vs Vanilla JavaScript

## Why I investigated it

TIMEBLOOM uses vanilla JavaScript for the frontend.

I wanted to investigate whether React would have been a better choice.

The question was not:

> "Is React better than JavaScript?"

The more useful question was:

> "Would React solve a real problem in TIMEBLOOM?"

---

## What I looked at

I compared the two approaches around:

* component reuse
* application state
* page navigation
* development setup
* dependency size
* learning curve
* deployment
* suitability for the size of TIMEBLOOM

---

## What React would improve

React would make component-based UI easier to organise.

For example, repeated components such as:

```text
MemoryCard
FlowerCard
Navigation
GrowthStage
```

could be represented as reusable components.

React's state model could also make some frontend state changes more structured.

---

## What React would add

However, introducing React would also add:

* a build system
* additional dependencies
* React-specific concepts
* component architecture
* additional configuration

TIMEBLOOM is small enough that vanilla JavaScript is still understandable.

---

## Decision

I would not switch TIMEBLOOM to React for Build Week.

The main reason is scope.

The current application does not have enough frontend complexity to justify introducing a framework at this stage.

If TIMEBLOOM grew into a larger application with many reusable components and more complicated client-side state, I would reconsider the decision.

---

## Final conclusion

The side quest changed my view slightly.

I initially thought that using a modern framework automatically meant a better architecture.

After comparing the trade-offs, I think the better engineering decision is to use the simplest technology that solves the current problem.

For TIMEBLOOM:

**Vanilla JavaScript is currently sufficient.**

For a larger future version:

**React would become more attractive.**
