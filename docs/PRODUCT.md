# KaamSaathi product scope

## Who it is for

KaamSaathi is a local work companion for Indian creators, freelancers, and small-business owners who want understandable help with their website and content projects. The interface starts in English, includes Hindi labels, and offers a larger-text setting for easier reading.

## The first complete task loop

1. Start KaamSaathi on the Windows PC.
2. Optionally select a project folder. The app reads a bounded set of supported text files only.
3. Ask for an explanation, review, plan, or draft in the chat.
4. Read the response and decide whether to use it.
5. Select **Save last answer as a draft** to download a Markdown file or, if the browser permits, save it under `KaamSaathi-Drafts` in the selected folder.

The separate website review screen checks common metadata and markup details with local rules. It works without an AI model.

## What this release is and is not

This is a functional personal Windows workbench with a local Python server and a browser interface. Open-ended chat uses an Ollama model already installed on the same PC. A model can help with project explanations, plans, content, and suggestions. Results are drafts for the user to review.

This version does not control the whole computer, click through other apps, monitor activity, run in the background invisibly, edit arbitrary files, or act on an Android phone. It is not a trained/fine-tuned KaamSaathi model: it uses a prompt to guide an existing local model. Small local models can make mistakes and need human review.

## Design principles

- Keep the first workflow narrow and useful.
- Explain in simple language and make the main actions visible.
- Ask the user to select project files; never scan the whole device.
- Keep actions read-only by default and require a clear save action for drafts.
- Make offline behaviour and one-time online setup explicit.
- Keep English/Hindi and larger text in the first release.
- Add broader automation only as a separate, visible, permissioned feature.

## Later product direction

Possible next steps are a packaged Windows desktop app, reviewed voice support, safe preview/undo for explicitly approved file edits, a user-paired Android companion, and a documented connector for websites that the user owns. Each requires its own privacy and permission design. A shared hosted AI service would have ongoing costs and is outside the free local-first promise.

