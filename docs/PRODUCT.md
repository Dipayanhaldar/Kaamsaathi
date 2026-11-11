# Product scope

## The job KaamSaathi does

KaamSaathi gives a person a small, private work helper that can explain an idea, turn it into a plan, draft content, and give a basic review of selected website source files. The first audience is creators, students, older adults who prefer clear instructions, and small businesses that want a no-account offline tool.

## First release

- Chat with a local Qwen3.5 model on Android arm64 or Windows x64.
- Download the model only after the person chooses a size. The 0.8B version is the default; the larger 4B version needs more memory.
- Select text files to provide limited project context.
- Run deterministic checks against a selected HTML page without an AI model or internet.
- Copy or save/share generated drafts explicitly.
- English and Hindi interface labels, larger text, and a local activity view.

## Explicit boundaries

No screen capture, microphone, camera, app control, autonomous actions, background monitoring, live-site crawler, account system, cloud backend, or analytics in v0.1.0. The app does not modify project files. It cannot promise perfect answers and should not be used as the sole reviewer for security, accessibility, legal, medical, or financial decisions.

## Success criteria

1. A first-time user can install the APK or extract the Windows ZIP without installing Python, Ollama, or a C++ toolchain.
2. The user sees the model size and explicitly starts its download.
3. After the model is cached, chat and selected-file review work with the device disconnected.
4. A user can inspect and clear local chat/activity and choose whether to copy or share a draft.
5. The public release provides a clear install guide, known limitations, checksums, and a direct source link.
