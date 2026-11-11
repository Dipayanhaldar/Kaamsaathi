# Privacy and permissions

## What KaamSaathi does locally

- Serves its interface from a Python process bound to this computer (`127.0.0.1`).
- Reads supported text files only after you select a folder.
- Sends a chat message and the selected file context only to Ollama on this same computer.
- Stores chat history, language choice, model choice, and activity in the current browser’s local storage.
- Runs the basic website source audit locally, without an AI model.
- Saves a draft only after you choose Save. It never overwrites the files it reads.

## Internet use

The app itself has no analytics or hosted AI endpoint. Internet is needed to get Python/Ollama and to download a model. The in-app model download requires your confirmation and is handled through the local Ollama runtime. After setup, the app’s chat and source review work offline. Ollama is separate software and has its own licence and behaviour.

## Controls and limits

- Stop the app by closing its command window or pressing Ctrl+C in that window.
- Use **Clear history** to clear the app’s chat and activity from this browser.
- Choose only folders you are comfortable giving to a local model. Do not select secrets such as passwords or API keys.
- The app does not record the screen, keystrokes, or activity in other apps, and it does not run as a hidden background monitor.
- The local model may produce incorrect answers. Review its output before using it.

## Public-release review

Before distributing an installer or APK, document the exact bundled components and licences, data storage, Android permissions, signing and update process, supported Windows versions, and the model download flow. Have the release checked for security, accessibility, applicable privacy requirements, and store rules.

