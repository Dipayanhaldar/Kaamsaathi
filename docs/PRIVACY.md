# Privacy and permissions

## Data flows

- Chat runs locally inside the app using the model stored on the device.
- The first model download is started by the user and connects to the selected Hugging Face model repository.
- Selected text files are read only after the user opens the picker. Their text is supplied to the local model when the user sends a message.
- Chat history, activity, and the preferred model are saved locally with app preferences.
- Drafts are copied, saved, or shared only after the user taps that control.

There is no KaamSaathi account, cloud AI API, server, telemetry, screen capture, background scan, microphone, camera, or automatic app control in this release. Android's internet permission is used for the user-started model download. The Windows app makes no app-server requests except the model download.

## Retention and deletion

Chat and activity remain on the device until the user clears them, clears app data, or uninstalls the app. Model files are stored in the app's model cache and can be removed by clearing the app's storage through Android/Windows. Clearing chat does not delete the downloaded model.

## Limits

The app cannot guarantee a user's device has not been modified or compromised. Anyone with access to the unlocked device may be able to view locally saved data. Do not select documents containing passwords, private keys, or information you do not want included in a model prompt. Model answers can be inaccurate; review them before using or sharing.
