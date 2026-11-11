# KaamSaathi app source

This Flutter app builds an Android arm64 APK and a portable Windows x64 folder. End users do not install Python or Ollama. The app bundles the local `llama.cpp` runtime; GGUF model weights remain separate and are downloaded only after the user selects a model.

## Use the release

1. Install the APK on a 64-bit Android phone or extract the Windows ZIP and open `kaamsaathi.exe`.
2. Choose **Set up free offline AI** and download a model while online.
3. When setup finishes, chat and local website-source checks work offline.

The 0.8B model file is about 533 MB. The 4B Q4 model file is about 2.74 GB and uses more memory. The AI runs on the user's device, so speed and answer quality vary by device; this is not equivalent to a large hosted model.

## Build from source

The GitHub Actions workflow generates temporary Android and Windows Flutter hosts, copies this directory's `pubspec.yaml` and `lib/` into them, then builds both platforms. It requires Flutter 3.38.6 or newer and Dart 3.10.7 or newer; Android builds also use Java 17. To build locally, install Flutter, run `flutter create --platforms=android,windows --project-name=kaamsaathi --org=in.dipayan build_host` here, copy `pubspec.yaml` and the contents of `lib/` into `build_host/`, then run `flutter pub get` and the relevant `flutter build` command there.

## Dependencies and model

- `llamadart` embeds on-device inference through llama.cpp; the consumer does not install a separate model server.
- The app downloads a GGUF file from Hugging Face only after the user asks it to.
- The selected Qwen3.5 model files are Apache 2.0. The model is not included in this source repository or app archive.
- Chat and activity are stored locally. Selected files are read only after selection; at most 8,000 characters are used as model context.
- No screen monitoring, other-app control, live web access, or automatic source-file edits are implemented.

The first APK uses the generated debug signing key; future releases signed with another key may require the user to uninstall first. The Windows ZIP is unsigned and may display a SmartScreen notice.
