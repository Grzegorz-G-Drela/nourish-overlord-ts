# Nourish Overlord

A nutrition tracking app that analyses meals and calculates calories burned during activity. Built as a full TypeScript rewrite of an earlier vanilla JS/Express project, with runtime validation and a full Jest test suite.

**Live:** https://nourish-overlord-ts-production.up.railway.app

---

## What it does

- Look up macros for any food (calories, protein, fat, carbohydrates)
- Get a reaction to your meal from one of six personalities (angry chef, drill sergeant, therapist, and more)
- Calculate calories burned for any activity and duration

---

## Stack

- **Node.js / Express** — backend server
- **TypeScript** — full type safety across all source files
- **Zod** — runtime validation of all external API responses
- **Jest + ts-jest** — unit and integration tests (95%+ coverage)
- **CalorieNinjas API** — meal macro data
- **API Ninjas API** — calories burned data
- **Anthropic API (claude-haiku-4-5-20251001)** — personality-driven reactions

---

## Why TypeScript + Zod?

TypeScript catches type errors at compile time, but once the code is running, those types are gone. External APIs can return anything. Zod validates the shape of every API response at runtime — if the data doesn't match the expected schema, it throws before the bad data can cause a bug deeper in the app.

---

## Running locally

```bash
git clone https://github.com/your-username/nourish-overlord-ts
cd nourish-overlord-ts
npm install
```

Create a `.env` file in the project root:

```
CALORIE_NINJAS_KEY=your_key
NINJAS_API_KEY=your_key
ANTHROPIC_API_KEY=your_key
```

```bash
npm run dev
```

Open `index.html` with Live Server on port 5500. API runs on port 3000.

---

## Tests

```bash
npm test
npm run test:coverage
```

All API calls are mocked — no real HTTP in tests. Coverage target: 80%+.

---

## API endpoints

| Method | Endpoint | Body | Returns |
|--------|----------|------|---------|
| GET | /health | — | `{ status: "ok" }` |
| POST | /api/meal | `{ query, personality }` | `{ items, reaction }` |
| POST | /api/burned | `{ activity, duration }` | `{ burned }` |