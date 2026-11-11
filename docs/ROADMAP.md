# Roadmap

## v0.1.3 — streaming chat

- Show offline model text as it is generated instead of waiting for the complete reply.
- Add a Stop control that cancels generation and preserves any partial answer.
- Show a clear retry hint when generation finishes without reply text.

## v0.1.0 — offline beta

- Android arm64 APK and portable Windows x64 ZIP from GitHub Actions.
- Embedded local inference runtime with optional 0.8B and 4B Q4 models.
- English/Hindi interface labels, larger text, local history, explicit save/share, and basic selected-HTML source checks.
- Document privacy, supported systems, model download size, and limitations.

## Next, based on user feedback

- Obtain and keep a stable Android signing key; verify upgrades install over prior releases.
- Verify the Windows package on a clean Windows machine and add a signed MSIX/Store path if requested.
- Add accessibility checks with a broader standards-aware report and sample project packs.
- Add safer, user-confirmed local project actions only after a threat model and recovery/undo design.
- Consider an opt-in project integration protocol after documenting its permissions, data flow, and compatibility contract.

## Later, separately funded

Hosted website analysis and shared cloud features need hosting, abuse controls, privacy terms, and ongoing operating cost. They are outside the free offline v0.1.0 design. No cloud or paid API is enabled in this first release.

