# Architecture

## Overview

```text
Flutter UI (Android / Windows)
  ├─ Chat, model setup, selected-file review, activity and privacy screens
  ├─ llamadart → embedded llama.cpp runtime → local GGUF model
  └─ shared_preferences → chat/activity/model choice on the device

First model download: user action → Hugging Face → device model cache
```

There is no KaamSaathi server, account, remote inference API, database, or analytics service. The Flutter project is in `apps/kaamsaathi`. GitHub Actions builds Android arm64 and Windows x64 deliverables. The consumer ZIP contains the full Windows release folder; do not distribute the executable alone.

## Inference and data

`llamadart` uses `llama.cpp` to load Qwen3.5 GGUF weights in-process. The native runtime is resolved by the package build hook and bundled into platform builds. A user presses the setup button to download the selected model; only then does the app contact Hugging Face. Once the model is cached, chat needs no network.

Chat messages, activity, and the chosen model are saved locally through shared preferences. Text files are opened only after the user selects them. The file picker accepts at most 12 plain-text files, each up to 50 KB, and limits aggregate selected text. The app passes at most 8,000 selected-file characters into each model prompt. The HTML review works locally and does not require the model.

## Release targets

- Android arm64 APK, generated with a temporary Flutter Android host, minimum Android API 28, internet permission for the user-started model download.
- Windows x64 ZIP with Flutter runner, plugins, and native runtime assets. The native model runtime needs AVX2 on Windows x64. The 64-bit Windows build is not a Microsoft Store installer.

The app source uses no shell or Python at runtime. GitHub Actions uses Flutter and Java only as build tools. Review the workflow and package dependency licenses before changing the release pipeline.
