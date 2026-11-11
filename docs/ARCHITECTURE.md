# Architecture

## Running product

```text
Browser UI (served by this PC)
   ├── local Python standard-library server on 127.0.0.1
   │      ├── deterministic website source audit
   │      └── local Ollama runtime on 127.0.0.1:11434
   └── browser local storage for chat history and activity

Selected project folder ── text files read by the browser ── local chat request
```

`Start-KaamSaathi.bat` starts the local server. The server chooses an available port in the 8765–8789 range and opens the browser. It binds only to loopback, adds browser security headers, rejects requests from other hosts/origins, and does not log request bodies or prompts.

The browser sends local chat requests to this app server. The app server forwards them only to an installed local Ollama model. There is no remote AI endpoint, authentication key, database, or cloud backend. A model download is started only after the user presses a download button and confirms; that one-time transfer goes through Ollama to its model registry.

## Offline behaviour

After Python, Ollama, and a model are installed/downloaded, the core website review and model chat can run without internet access. The service worker caches the static interface, but the local server must still be running for the app to work. The model is not included in GitHub because it is several gigabytes and has separate terms.

## File access and writes

The browser asks the user to select one folder. It reads supported text files only, up to 30 files and 220,000 characters in total, and skips common dependency/build folders. The selected paths and contents are sent to the local model only when the user sends a chat message. The server validates file types and size again.

Saving an answer is a separate user action. The browser asks for write permission at save time if it is able to write into the selected folder; otherwise it downloads the draft. No source file is overwritten.

## Later integrations

Android, a Windows installer, a store package, remote access, and website plug-ins are not part of this build. A future integration should send only the selected task context and make any changes or network transfer visible to the user. A cloud service should remain off by default and cannot be promised free at scale.

