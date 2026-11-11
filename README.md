# KaamSaathi

**A private, offline-first work companion for Android and Windows.** Use it to explain, plan, review, and draft from a small local AI model. The first version is designed for creators, students, and small businesses, with simple English and Hindi controls.

**Website:** [kaamsaathi-downloads.onrender.com](https://kaamsaathi-downloads.onrender.com/)

## Download

Open [GitHub Releases](https://github.com/Dipayanhaldar/Kaamsaathi/releases/latest) and download:

- `KaamSaathi-Android-arm64.apk` for most recent 64-bit Android phones.
- `KaamSaathi-Windows-x64.zip` for 64-bit Windows 10/11 PCs.

On Windows, extract the whole ZIP folder and open `kaamsaathi.exe`. On Android, install the APK from your downloaded file; Android may ask you to allow installation from that source. This is a direct-download beta, not a Microsoft Store package.

## First use and offline mode

The app contains its local inference engine. It does **not** require Python, Ollama, a cloud account, or an AI API. When you first open **Set up free offline AI**, choose a model and download it over the internet. After that finishes, chat and source review run on your device without internet. KaamSaathi reloads the saved model from local storage when you reopen the app. The app does not bundle model weights in the APK or Windows ZIP, so you choose when to use the storage and data for the model download.

- **Qwen3.5 0.8B Q4:** about 533 MB; the lighter choice for phones and everyday tasks.
- **Qwen3.5 4B Q4:** about 2.74 GB; requires substantially more memory and storage. The app recommends 8 GB RAM or more.

The model is a small local model. It can be slow, miss details, or give wrong answers; it will not match the strongest hosted systems on every task. The 4B option needs more memory. Internet is required for the first model download; the app itself has no cloud AI endpoint.

## What it does

- Chat to explain, plan, review, and draft in plain language.
- See local AI replies appear as they are generated; stop a long answer and keep its partial text.
- Select text files for local project context. Only selected files are read; the app does not scan folders in the background.
- Check an HTML page for a few common source issues, such as missing title, language, heading, image alt text, or mobile viewport.
- Save, copy, or share a draft only when you choose to.
- Use English or Hindi labels, larger text, and an on-device activity list.

## What it does not do

KaamSaathi does not monitor your screen, run in the background, control other apps, browse the live web, change your project files, or complete actions for you. It is an offline work assistant with selected-file context, not an autonomous computer-control agent. Website checks are basic source hints, not a security, accessibility, legal, or SEO audit.

## Privacy and cost

There is no account, cloud backend, telemetry, paid API, or in-app transaction. Chat and activity are stored on the device and can be cleared in the app. Selected files and prompts are processed locally by the model after setup. The one-time model download comes from Hugging Face. You still provide your own device, storage, electricity, and internet data for that download.

Read [Privacy](docs/PRIVACY.md), [Product scope](docs/PRODUCT.md), [Architecture](docs/ARCHITECTURE.md), and [Roadmap](docs/ROADMAP.md).

## Build from source

The GitHub Actions workflow builds the Android arm64 APK and portable Windows x64 ZIP and attaches them to a release. Consumers need no local C++ toolchain; the `llamadart` package build hook fetches the native runtime during the GitHub build. To build locally, use Flutter 3.38.6 or newer, Dart 3.10.7 or newer, and Java 17 for Android. See [`apps/kaamsaathi/README.md`](apps/kaamsaathi/README.md).

## Licences

This app source uses the MIT License. `llamadart` is MIT-licensed. Qwen3.5 model weights and the selected GGUF conversions are published under Apache 2.0; model files are downloaded directly from [Unsloth's 0.8B GGUF](https://huggingface.co/unsloth/Qwen3.5-0.8B-GGUF) or [4B GGUF](https://huggingface.co/unsloth/Qwen3.5-4B-GGUF) repositories. Those projects have their own notices and attribution requirements.

## Early release notes

The initial Android APK uses the generated debug signing key; future builds signed with a different key may require uninstalling the old copy first. The Windows ZIP is unsigned, so SmartScreen may show a warning. The first release supports Android arm64 and Windows x64 only. See the release notes for the exact build status.

