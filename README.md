# KaamSaathi

**A private, offline-first work companion for Windows.** It helps creators and small businesses review a website project, understand their files, plan work, and draft content in English or Hindi. The app works on your PC and does not use a paid AI API or hosted AI service.

## What this first version does

- Reviews basic website source details offline, even without an AI model.
- Lets you ask a local AI model to explain, review, plan, and draft from up to 30 text files in a folder you select.
- Lets you save an answer as a Markdown draft only after you ask it to save.
- Includes English and Hindi interface labels, larger text, and a local activity list.
- Does not watch your screen, record other apps, or edit project files on its own.

KaamSaathi is a focused work helper, not a general computer-control bot. It cannot operate every app or phone task in this version.

## Start it on Windows

1. Install [Ollama for Windows](https://ollama.com/download/windows). Ollama runs the model on your own computer.
2. Install [Python 3 for Windows](https://www.python.org/downloads/windows/) if Python is not already installed. Python is used only to run the local app server; this project needs no extra Python packages.
3. Download this repository as a ZIP from GitHub and extract it to a folder.
4. Double-click `Start-KaamSaathi.bat`. Keep the small command window open while using the app; close it or press Ctrl+C to stop KaamSaathi.
5. In KaamSaathi, open **Local model** and download one of the offered models. This is a one-time download and needs internet. Choose the smaller option if your PC has limited memory.
6. After the model finishes downloading, disconnect from the internet if you like. Website source checks and local model chats run on the computer.

The app opens in your browser at a local address. You can use the browser’s install option to add it to the Windows desktop if the browser offers one. This repository does not yet contain a signed Windows installer or Microsoft Store package.

## How offline and free use works

- **No paid AI API or cloud account:** chats are sent only to Ollama running on `127.0.0.1` on your computer.
- **One-time setup needs internet:** download Ollama and a model before using the AI features offline. The model is not included in this repository because it is large.
- **Offline without AI:** the website source check works without Ollama or a downloaded model.
- **No app telemetry:** KaamSaathi itself does not send prompts, project files, or usage analytics to a server. The only app-triggered internet transfer is the model download you start yourself through Ollama.
- **No guaranteed zero cost for every user:** the code and local inference do not require a paid API, but the user supplies a compatible PC, electricity, storage, and internet for initial downloads. Model and Ollama licences/terms apply.

## Your project files and history

Choose a folder to let KaamSaathi read supported text files such as HTML, CSS, JavaScript, Markdown, JSON, and Python. It reads at most 30 files and limits how much text it uses. Files are passed to the local model only when you send a chat request. The app does not crawl other folders. Chat history and activity stay in your browser’s local storage; **Clear history** removes them. Drafts are downloaded or written into `KaamSaathi-Drafts` only when you choose Save.

Do not select folders containing passwords, API keys, or private files you do not want included in a local model prompt.

## Requirements and limits

- Windows 10/11, Python 3, a supported browser, and Ollama for AI chat.
- Local model speed and answer quality depend on your PC and the model you choose. A small local model will not match a large hosted model on every task.
- Current model downloads are intentionally limited to the two choices shown in the app.
- The website check reads source files; it does not visit a live site, test visual design, or provide a full security/accessibility audit.
- There is no Android APK, Microsoft Store package, hosted website, shared multi-user service, or automatic control of your computer in this first release.

## Project notes

- [Product scope](docs/PRODUCT.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Privacy details](docs/PRIVACY.md)
- [Roadmap and release plan](docs/ROADMAP.md)

The repository is private during personal development. Public APK and Microsoft Store distribution can be considered after a separate Android/Windows packaging and release review. Google Play is not in the current plan.

## Licence

This repository uses the MIT License. The local model runtime and model files are separate software and have their own licences and terms.

