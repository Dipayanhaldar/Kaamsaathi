# Architecture direction

## Prototype in this repository

`index.html`, `styles.css`, and `app.js` form a static, dependency-free prototype. Browser local storage holds demo projects, activity, language choice, and plans. The service worker caches static assets for a basic offline revisit when served over HTTPS or localhost. There is no model, server, telemetry, or device-control layer in this prototype.

## Intended local-first product

```text
Windows companion ── local model runtime ── selected project workspace
        │                         │
        └── visible task history ─┘
                    │ optional, user-approved connector
                    ▼
            project feedback panel

Android companion: task entry, notification, status, and approval
Static website: explanation, downloads, privacy details, and updates
```

The user's PC should perform the first agent work. This avoids making a free cloud server host every model request. The Android app can initially talk to the Windows companion on the same network only when the user deliberately pairs them; a remote always-on connection would require a hosted relay and would introduce an operating cost and a security surface.

## Integration rule

“No paid external AI API” is compatible with local inference. Project-to-agent communication still needs a defined connector: for example, a free JavaScript package or a local companion bridge. Each integration must request only the data it needs and show the user what context will be shared.

## Trust boundaries

- Treat project files and page content as untrusted input.
- Keep model inference local by default.
- Give the agent access only to user-selected workspaces.
- Use a staged plan: read → propose → preview → approve → write.
- Keep browser and operating-system automation visible and user-started.
- Never store raw credentials or model secrets in the project database.
- Record action summaries locally; let the user pause, clear, export, or remove project access.

## Later cloud option

Azure or AWS may later support opt-in backups, shared team workspaces, or relays. They should be disabled in the personal no-cost edition by default. Cloud resources must have quotas, budget alerts, and a shutdown path before public use.

