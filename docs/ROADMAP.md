# Roadmap

## Personal Windows release in this repository

- [x] English/Hindi interface labels and larger-text setting.
- [x] Local project folder selection with bounded text-file reading.
- [x] Basic deterministic website source review that runs without AI.
- [x] Local Ollama model discovery and user-started download of two recommended models.
- [x] Local chat for explanations, reviews, plans, and drafts.
- [x] Save drafts only after a user action; local activity and clear-history control.
- [x] Windows double-click launcher and offline app-shell cache.
- [ ] Package as a signed Windows installer and prepare Microsoft Store submission.
- [ ] Test on supported Windows PCs and review Hindi translations/accessibility with users.

## Later work

1. Improve first-run setup and provide model sizing guidance based on the user’s PC.
2. Add safe draft previews and restore for explicitly approved file edits.
3. Add speech only after selecting and testing an offline speech engine.
4. Build a user-paired Android companion; keep device-wide monitoring out of scope.
5. Publish a documented connector for websites/projects the user owns.
6. Consider Azure/AWS only for opt-in features that truly need shared remote state, with budgets and a shutdown path.

## Distribution decisions

- Google Play is not planned.
- The current repository is the source code, not a released installer or APK.
- Microsoft Store and direct APK distribution require separate packaging, signing, device testing, privacy review, and release assets.
- GitHub Releases/site downloads can be considered for the Android build after that work is complete. Uptodown or PhonePe can be reconsidered at release time.

