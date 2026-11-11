# Product outline

## Problem

Creators, freelancers, older adults, and small-business owners often need help moving from “I want this done” to a finished task. Existing technical tools can be hard to connect, explain, and trust. A capable assistant should work with projects the person chooses, explain its plan clearly, and make it easy to see or reverse what it did.

## Product promise

**Say what you want done. KaamSaathi explains the plan, works only in the project you chose, and shows what happened.**

## First audience

Start with Indian independent creators and freelancers who maintain a website or content project themselves. Older users are a key accessibility audience from day one: simple language, readable text, clear voice-oriented interaction when a suitable local speech option is available, and no hidden activity collection.

## The first complete task loop

1. The user adds a project or selects a local project folder.
2. The user describes one outcome in Hindi or English.
3. The agent states its interpretation and offers a short plan.
4. The user approves specific steps or edits the plan.
5. The agent drafts a review, checklist, or file change inside a safe workspace.
6. The user previews and approves any write.
7. The agent records a plain-language summary and offers restore where possible.

## MVP boundaries

The first real agent should complete a narrow creator workflow end-to-end: review a selected website project and produce an actionable improvement plan, with draft edits in a separate preview. It should not claim general computer autonomy.

The current `index.html` prototype demonstrates only the interface and local task list. Plan generation is intentionally labeled as demo logic; it is not model-backed.

## Device roles

- **Windows companion:** local model and project-folder worker, with a visible tray/status control and a safe file workspace.
- **Android companion:** task entry, status, project sharing, notifications, and approvals. Device-wide hidden monitoring is out of scope. Android capabilities are limited to documented, user-permitted integrations.
- **Project connector:** an optional, free SDK or plugin for projects we own, passing only selected page/task context and returning feedback to an in-project panel.

## Free-by-design approach

Prototype and personal use: static site, local storage, and local inference on the user's device. Do not promise an always-on hosted agent at zero cost. Keep model selection optional and hardware-aware. For public use, each user can download and run the local model; any hosted shared intelligence or storage needs clear limits and funding.

## Success measures for the first release

- A new user can create a project and request a plan without help.
- The user can identify when tracking is active and pause it.
- Every proposed action is described before approval.
- A user can find what changed and restore a prior version.
- English/Hindi and large-text controls are usable with keyboard, touch, and screen readers.
- The first chosen creator workflow is useful without requiring a paid API.

