# ZeeTeach Program Flowchart

This chart maps the main student journey through the site, including the lesson tools available from the economics chapter page.

```mermaid
flowchart TD
    A([Student opens ZeeTeach]) --> B[Home: choose Plus One or Plus Two]
    B -->|Plus One| C[Choose grade and syllabus]
    B -->|Plus Two| D[Choose Grade +1 Improvement or Class XII Current]
    D --> C
    C --> E{Available curriculum?}
    E -->|Class XI + Kerala| F[Choose Commerce or Humanities]
    E -->|Other grade or syllabus| G[Show coming later options]
    G --> B
    F --> H{Choose stream}
    H -->|Commerce| I[Commerce subjects]
    H -->|Humanities| J[Humanities subjects]
    I --> K[Economics]
    J --> K
    K --> L[Chapter 1: Indian Economic Development]

    L --> M{Choose learning activity}
    M -->|Presentation| N[Load slide data and render slides]
    N --> O{Navigate slides}
    O -->|Buttons, dots, keyboard, or swipe| O
    O -->|Fullscreen, print, download, or share| P[Run selected presentation action]
    O -->|Reach first or last slide| Q[Disable previous or next as appropriate]
    M -->|Study guide| R[Read nine chapter explanations and revision notes]
    M -->|Quiz| S[Answer chapter questions]
    S --> T[Review missed questions]
    T --> R

    L --> U[Server serves page and static assets]
    U --> V[Apply security headers and production settings]
    V --> W{Request type}
    W -->|Page or asset| X[Return requested file]
    W -->|Health or slides API| Y[Apply rate limit, then return JSON]
    W -->|Unknown route| Z[Return 404]
```

## Main program components

- `server.js` serves the pages, assets, downloads, health endpoint, and read-only slides API.
- `syllabus.js` and `streams.js` carry grade, syllabus, and track selections through navigation and disable unavailable options.
- `app.js` renders the economics presentation and handles slide navigation and actions.
- `study-guide.html` and `quiz.html` provide the reading and assessment paths.
- `flow.js` reads supported URL selections and applies them to the page navigation.
