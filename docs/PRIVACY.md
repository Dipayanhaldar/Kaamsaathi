# Privacy and permissions

## Current prototype

The prototype does not call an AI model, access files, read the screen, or communicate with a backend. Project names, plans, interface preferences, and activity entries are saved in the current browser's local storage. Removing site data clears them. Do not enter sensitive information into this demo.

## Product rules

- Ask the user to select each project or folder.
- Explain what will be read before scanning it.
- Start with read-only access; request write permission only for a specific approved action.
- Display an active status when the companion is doing work.
- Provide pause, clear-history, and remove-project controls.
- Collect no keystrokes, screenshots, or activity outside the user's selected task.
- Do not upload project content or prompts unless the user explicitly chooses a named cloud feature.
- Give older users the same simple permission explanation in their selected language.

## Public release checklist

Before any public build, document data stored locally, any external network requests, model licences, Android permissions, crash reporting, data deletion, and the purpose of every connector. Ask a qualified reviewer to check applicable privacy and platform requirements for each release market.

