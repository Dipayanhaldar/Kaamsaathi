"use strict";

const API = "/api";
const STORAGE_KEY = "kaamsaathi-local-v1";
const ALLOWED_EXTENSIONS = new Set([".html", ".htm", ".css", ".js", ".ts", ".jsx", ".tsx", ".md", ".txt", ".json", ".yml", ".yaml", ".py"]);
const EXCLUDED_DIRS = new Set([".git", "node_modules", "vendor", "dist", "build", ".next", ".venv", "venv", "__pycache__"]);
const MAX_PROJECT_FILES = 30;
const MAX_PROJECT_CHARS = 220000;

const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[char]);
const dynamicText = {
  en: {
    modelOffline: "Local model not ready",
    runtimeMissing: "Ollama is not running on this computer.",
    runtimeMissingHelp: "Install the free Ollama app once, then return here. The link opens its official Windows download page.",
    chooseModel: "Download a model once, then use it offline.",
    installed: "Installed",
    download: "Download once",
    downloading: "Downloading…",
    modelReady: "Model ready",
    noModels: "No local models found yet.",
    selectModel: "Use this model",
    modelSelected: "Selected",
    downloadNeedsInternet: "This one-time model download needs an internet connection.",
    emptyAnswer: "The local model returned an empty answer.",
    askError: "I couldn't reach the local model. Check that Ollama is open.",
    chooseFiles: "Choose a project folder to include its text files.",
    folderCancelled: "Folder selection cancelled.",
    noReadableFiles: "No supported text files were found in that folder.",
    projectSelected: "Project selected",
    filesReady: " text files are ready as context. Nothing has been uploaded.",
    folderReopen: "This browser does not support folder access. You can still run an audit, but saving back to the folder is unavailable.",
    auditReady: "Offline website check complete.",
    auditNeedProject: "Choose a website folder first.",
    cleared: "Local chat and activity history cleared.",
    saved: "Draft saved in the selected project folder.",
    downloaded: "Draft downloaded to your Downloads folder.",
    saveError: "Could not save the draft. You can download it instead.",
    thinking: "Thinking on this computer…",
    high: "Needs attention",
    medium: "Worth improving",
    low: "Small improvement",
    info: "Note",
    localMissing: "A local model is needed for open-ended writing. The website source check still works without AI.",
    user: "You",
    assistant: "KaamSaathi"
  },
  hi: {
    modelOffline: "लोकल मॉडल तैयार नहीं",
    runtimeMissing: "इस कंप्यूटर पर Ollama चालू नहीं है।",
    runtimeMissingHelp: "Ollama ऐप एक बार इंस्टॉल करें, फिर यहाँ लौटें। यह लिंक इसकी आधिकारिक Windows डाउनलोड साइट खोलेगा।",
    chooseModel: "मॉडल एक बार डाउनलोड करें, फिर ऑफलाइन चलाएँ।",
    installed: "इंस्टॉल है",
    download: "एक बार डाउनलोड करें",
    downloading: "डाउनलोड हो रहा है…",
    modelReady: "मॉडल तैयार",
    noModels: "अभी कोई लोकल मॉडल नहीं मिला।",
    selectModel: "यह मॉडल चुनें",
    modelSelected: "चुना गया",
    downloadNeedsInternet: "मॉडल का यह एक बार का डाउनलोड इंटरनेट से होगा।",
    emptyAnswer: "लोकल मॉडल से जवाब नहीं मिला।",
    askError: "लोकल मॉडल से जुड़ नहीं पाए। जाँचें कि Ollama खुला है।",
    chooseFiles: "टेक्स्ट फाइलें जोड़ने के लिए प्रोजेक्ट फ़ोल्डर चुनें।",
    folderCancelled: "फ़ोल्डर चुनना रद्द किया गया।",
    noReadableFiles: "इस फ़ोल्डर में कोई समर्थित टेक्स्ट फाइल नहीं मिली।",
    projectSelected: "प्रोजेक्ट चुना गया",
    filesReady: " टेक्स्ट फाइलें संदर्भ के लिए तैयार हैं। कुछ अपलोड नहीं हुआ।",
    folderReopen: "यह ब्राउज़र फ़ोल्डर एक्सेस नहीं देता। आप जाँच कर सकते हैं, पर फ़ोल्डर में सेव नहीं कर पाएँगे।",
    auditReady: "ऑफलाइन वेबसाइट जाँच पूरी हुई।",
    auditNeedProject: "पहले वेबसाइट का फ़ोल्डर चुनें।",
    cleared: "लोकल चैट और गतिविधि इतिहास मिटा दिया।",
    saved: "ड्राफ्ट चुने हुए प्रोजेक्ट फ़ोल्डर में सेव हुआ।",
    downloaded: "ड्राफ्ट डाउनलोड फ़ोल्डर में आया।",
    saveError: "ड्राफ्ट सेव नहीं हुआ। आप उसे डाउनलोड कर सकते हैं।",
    thinking: "इस कंप्यूटर पर सोच रहा है…",
    high: "ध्यान देने योग्य",
    medium: "सुधारने लायक",
    low: "छोटा सुधार",
    info: "जानकारी",
    localMissing: "लिखने और खुले सवालों के लिए लोकल मॉडल चाहिए। वेबसाइट सोर्स जाँच AI के बिना भी चलती है।",
    user: "आप",
    assistant: "KaamSaathi"
  }
};

let state = loadState();
let localStatus = null;
let projectFiles = [];
let projectHandle = null;
let projectName = "";
let lastAnswer = "";
let isSending = false;
let statusTimer = null;
let toastTimer = null;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return saved ? {
      language: saved.language === "hi" ? "hi" : "en",
      largeText: Boolean(saved.largeText),
      model: typeof saved.model === "string" ? saved.model : "",
      messages: Array.isArray(saved.messages) ? saved.messages.slice(-80) : [],
      activity: Array.isArray(saved.activity) ? saved.activity.slice(0, 80) : []
    } : { language: "en", largeText: false, model: "", messages: [], activity: [] };
  } catch {
    return { language: "en", largeText: false, model: "", messages: [], activity: [] };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    showToast("Could not save local history in this browser.");
  }
}

function t(key) {
  return dynamicText[state.language][key] || dynamicText.en[key] || key;
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function applyLanguage() {
  document.documentElement.lang = state.language;
  document.querySelectorAll("[data-en][data-hi]").forEach((element) => {
    element.textContent = element.dataset[state.language];
  });
  $("#language-toggle").textContent = state.language === "en" ? "हिं / EN" : "EN / हिं";
  const input = $("#message-input");
  input.placeholder = input.dataset[state.language === "en" ? "placeholderEn" : "placeholderHi"];
  $("#text-toggle").setAttribute("aria-pressed", String(state.largeText));
}

function addActivity(title, kind) {
  state.activity.unshift({ title, kind, time: new Date().toISOString() });
  state.activity = state.activity.slice(0, 80);
  saveState();
  renderHistory();
}

function formatTime(value) {
  return new Intl.DateTimeFormat(state.language === "hi" ? "hi-IN" : "en-IN", {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit"
  }).format(new Date(value));
}

function setView(viewName) {
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === "view-" + viewName));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === viewName));
  const active = document.querySelector(".nav-item[data-view='" + viewName + "']");
  const title = active ? active.querySelector("span:nth-child(2)").textContent : "KaamSaathi";
  $("#top-view-title").textContent = title;
}

function renderMessages() {
  const list = $("#messages");
  const empty = $("#empty-state");
  empty.classList.toggle("hidden", state.messages.length > 0);
  list.innerHTML = state.messages.map((message) => {
    const isUser = message.role === "user";
    return "<article class='message " + (isUser ? "user-message" : "assistant-message") + "'>"
      + "<div class='message-avatar'>" + (isUser ? "Y" : "✦") + "</div>"
      + "<div class='message-body'><div class='message-author'>" + t(isUser ? "user" : "assistant") + "</div>"
      + "<div class='message-content'>" + escapeHtml(message.content).replace(/\n/g, "<br>") + "</div></div></article>";
  }).join("");
  list.scrollTop = list.scrollHeight;
  const hasAnswer = [...state.messages].reverse().some((message) => message.role === "assistant");
  $("#save-draft-row").classList.toggle("hidden", !hasAnswer);
  if (hasAnswer) lastAnswer = [...state.messages].reverse().find((message) => message.role === "assistant").content;
}

function renderHistory() {
  const container = $("#history-list");
  if (!state.activity.length) {
    container.innerHTML = "<div class='empty-history'>" + (state.language === "hi" ? "आपके शुरू किए काम यहाँ दिखेंगे।" : "Tasks you start will appear here.") + "</div>";
    return;
  }
  container.innerHTML = state.activity.map((item) => {
    const kind = item.kind === "audit" ? "⌕" : item.kind === "chat" ? "✦" : "↓";
    return "<div class='history-row'><span class='history-icon'>" + kind + "</span><div class='history-copy'><strong>" + escapeHtml(item.title) + "</strong><small>" + escapeHtml(item.kind) + "</small></div><time>" + formatTime(item.time) + "</time></div>";
  }).join("");
}

function renderProjectSummary() {
  const hasFiles = projectFiles.length > 0;
  $("#project-label").textContent = hasFiles ? projectName : (state.language === "hi" ? "कोई प्रोजेक्ट फ़ोल्डर नहीं चुना" : "No project folder selected");
  $("#project-detail").textContent = hasFiles
    ? (projectFiles.length + t("filesReady"))
    : (state.language === "hi" ? "एजेंट को टेक्स्ट फाइलें पढ़ने देने के लिए फ़ोल्डर चुनें।" : "Choose a folder to let the agent read its text files.");
  $("#audit-project-name").textContent = hasFiles ? projectName : t("auditNeedProject");
  $("#audit-project-count").textContent = hasFiles
    ? (projectFiles.length + (state.language === "hi" ? " टेक्स्ट फाइलें तैयार" : " text files ready"))
    : (state.language === "hi" ? "केवल HTML, CSS, JavaScript और टेक्स्ट फाइलें" : "HTML, CSS, JavaScript, and text files only");
  $("#run-audit").disabled = !hasFiles;
}

function renderConnection() {
  const pill = $("#connection-pill");
  const label = $("#connection-text");
  const modelName = $("#open-models").querySelector("span:nth-child(2)");
  const selectedExists = localStatus && localStatus.models.includes(state.model);
  if (selectedExists) {
    pill.className = "connection-pill connected";
    label.textContent = state.language === "hi" ? "लोकल AI तैयार" : "Local AI ready";
    modelName.textContent = state.model;
  } else if (localStatus && localStatus.models.length) {
    pill.className = "connection-pill connected";
    label.textContent = state.language === "hi" ? "लोकल मॉडल उपलब्ध" : "Local models available";
    modelName.textContent = state.language === "hi" ? "मॉडल चुनें" : "Choose model";
  } else if (localStatus && localStatus.runtime_available) {
    pill.className = "connection-pill needs-setup";
    label.textContent = t("modelOffline");
    modelName.textContent = state.language === "hi" ? "सेटअप" : "Set up";
  } else {
    pill.className = "connection-pill needs-setup";
    label.textContent = t("modelOffline");
    modelName.textContent = state.language === "hi" ? "सेटअप" : "Set up";
  }
}

function renderModelDialog() {
  const runtimeHelp = $("#runtime-help");
  const options = $("#model-options");
  if (!localStatus || !localStatus.runtime_available) {
    runtimeHelp.innerHTML = "<div class='runtime-alert'><strong>" + escapeHtml(t("runtimeMissing")) + "</strong><p>" + escapeHtml(t("runtimeMissingHelp")) + "</p><a href='https://ollama.com/download/windows' target='_blank' rel='noopener noreferrer'>" + (state.language === "hi" ? "Ollama आधिकारिक डाउनलोड खोलें ↗" : "Open official Ollama download ↗") + "</a><small>" + (state.language === "hi" ? "एक बार इंस्टॉल करने के बाद मॉडल डाउनलोड करें।" : "Install once, then return to download a model.") + "</small></div>";
    options.innerHTML = "";
    return;
  }
  runtimeHelp.innerHTML = "<div class='runtime-ok'><span>✓</span><span>" + (state.language === "hi" ? "लोकल मॉडल रनटाइम तैयार।" : "Local model runtime is ready.") + "</span></div>";
  const recommendations = localStatus.recommended_models || {};
  const models = Object.keys(recommendations);
  options.innerHTML = models.map((name) => {
    const info = recommendations[name];
    const installedName = localStatus.models.find((model) => model === name || model.startsWith(name + "-"));
    const isSelected = state.model === installedName;
    const action = installedName
      ? "<button class='model-action " + (isSelected ? "selected" : "") + "' data-use-model='" + escapeHtml(installedName) + "'>" + (isSelected ? escapeHtml(t("modelSelected")) : escapeHtml(t("selectModel"))) + "</button>"
      : "<button class='model-action' data-download-model='" + escapeHtml(name) + "'>" + escapeHtml(t("download")) + "</button>";
    return "<div class='model-option'><div class='model-option-copy'><strong>" + escapeHtml(info.label) + "</strong><small>" + escapeHtml(info.fit) + " · " + escapeHtml(info.size) + "</small></div>" + action + "</div>";
  }).join("");
  if (localStatus.models.length) {
    const unlisted = localStatus.models.filter((model) => !models.some((name) => model === name || model.startsWith(name + "-")));
    if (unlisted.length) {
      options.innerHTML += "<div class='installed-list'><strong>" + (state.language === "hi" ? "अन्य लोकल मॉडल" : "Other local models") + "</strong><div>" + unlisted.map((model) => {
        return "<button class='installed-model " + (state.model === model ? "selected" : "") + "' data-use-model='" + escapeHtml(model) + "'>" + escapeHtml(model) + (state.model === model ? " ✓" : "") + "</button>";
      }).join("") + "</div></div>";
    }
  }
}

async function refreshStatus() {
  try {
    const response = await fetch(API + "/status", { cache: "no-store" });
    localStatus = await response.json();
    if (!localStatus.models.includes(state.model)) state.model = localStatus.models[0] || "";
    renderConnection();
    renderModelDialog();
    const pull = localStatus.pull;
    const progress = $("#pull-progress");
    if (pull && pull.running) {
      progress.classList.remove("hidden");
      $("#pull-status").textContent = pull.status || t("downloading");
      $("#pull-percent").textContent = pull.percent + "%";
      $("#pull-bar").style.width = pull.percent + "%";
      $("#pull-detail").textContent = pull.total ? (formatBytes(pull.completed) + " / " + formatBytes(pull.total)) : t("downloadNeedsInternet");
    } else if (pull && pull.finished && pull.error) {
      progress.classList.remove("hidden");
      $("#pull-status").textContent = state.language === "hi" ? "डाउनलोड रुक गया" : "Download stopped";
      $("#pull-detail").textContent = pull.error;
    } else if (pull && pull.finished) {
      progress.classList.remove("hidden");
      $("#pull-status").textContent = t("modelReady");
      $("#pull-percent").textContent = "100%";
      $("#pull-bar").style.width = "100%";
      $("#pull-detail").textContent = pull.model;
      if (!state.model) state.model = pull.model;
    } else {
      progress.classList.add("hidden");
    }
    saveState();
    renderConnection();
    renderModelDialog();
  } catch {
    localStatus = { runtime_available: false, models: [], recommended_models: {}, pull: { running: false } };
    renderConnection();
    renderModelDialog();
  }
}

function formatBytes(number) {
  if (!number) return "0 MB";
  return number >= 1024 * 1024 * 1024
    ? (number / (1024 * 1024 * 1024)).toFixed(1) + " GB"
    : (number / (1024 * 1024)).toFixed(0) + " MB";
}

function isAllowedFile(name) {
  const dot = name.lastIndexOf(".");
  return dot >= 0 && ALLOWED_EXTENSIONS.has(name.slice(dot).toLowerCase());
}

async function readHandleDirectory(handle, prefix, output, total) {
  for await (const [name, entry] of handle.entries()) {
    if (output.length >= MAX_PROJECT_FILES || total.value >= MAX_PROJECT_CHARS) return;
    if (entry.kind === "directory") {
      if (EXCLUDED_DIRS.has(name.toLowerCase()) || name.startsWith(".")) continue;
      await readHandleDirectory(entry, prefix ? prefix + "/" + name : name, output, total);
      continue;
    }
    if (!isAllowedFile(name) || name.startsWith(".")) continue;
    try {
      const file = await entry.getFile();
      if (file.size > 70_000 || total.value + file.size > MAX_PROJECT_CHARS) continue;
      const text = await file.text();
      output.push({ path: prefix ? prefix + "/" + name : name, text });
      total.value += text.length;
    } catch {
      // Skip files the browser cannot read; no content is collected in the background.
    }
  }
}

async function selectProjectFolder() {
  try {
    if ("showDirectoryPicker" in window) {
      projectHandle = await window.showDirectoryPicker({ mode: "read" });
      projectName = projectHandle.name;
      projectFiles = [];
      const total = { value: 0 };
      await readHandleDirectory(projectHandle, "", projectFiles, total);
    } else {
      projectHandle = null;
      $("#folder-input").click();
      return;
    }
  } catch (error) {
    if (error && error.name === "AbortError") return showToast(t("folderCancelled"));
    showToast(error && error.message ? error.message : t("chooseFiles"));
    return;
  }
  finishProjectSelection();
}

function finishProjectSelection() {
  if (!projectFiles.length) {
    projectHandle = null;
    projectName = "";
    renderProjectSummary();
    return showToast(t("noReadableFiles"));
  }
  projectFiles = projectFiles.slice(0, MAX_PROJECT_FILES);
  renderProjectSummary();
  addActivity((state.language === "hi" ? "प्रोजेक्ट चुना: " : "Selected project: ") + projectName, "project");
  showToast(t("projectSelected") + ": " + projectName);
}

$("#folder-input").addEventListener("change", async (event) => {
  const selected = [...event.target.files];
  if (!selected.length) return;
  projectName = selected[0].webkitRelativePath.split("/")[0] || "Selected project";
  projectHandle = null;
  projectFiles = [];
  let total = 0;
  for (const file of selected) {
    if (projectFiles.length >= MAX_PROJECT_FILES || total >= MAX_PROJECT_CHARS) break;
    if (!isAllowedFile(file.name) || file.size > 70_000 || total + file.size > MAX_PROJECT_CHARS) continue;
    try {
      projectFiles.push({ path: file.webkitRelativePath.split("/").slice(1).join("/") || file.name, text: await file.text() });
      total += file.size;
    } catch {}
  }
  event.target.value = "";
  finishProjectSelection();
});

function renderAudit(result) {
  const container = $("#audit-result");
  container.classList.remove("hidden");
  const cards = (result.issues || []).map((issue) => {
    const severity = ["high", "medium", "low", "info"].includes(issue.severity) ? issue.severity : "info";
    return "<article class='audit-item severity-" + severity + "'><span class='severity-label'>" + escapeHtml(t(severity)) + "</span><h3>" + escapeHtml(issue.title) + "</h3><p>" + escapeHtml(issue.detail) + "</p><div class='suggestion-line'><b>" + (state.language === "hi" ? "सुझाव:" : "Suggestion:") + "</b> " + escapeHtml(issue.suggestion) + "</div></article>";
  }).join("");
  container.innerHTML = "<div class='audit-summary'><span>✓</span><div><strong>" + escapeHtml(result.summary) + "</strong><small>" + escapeHtml(result.notice || t("auditReady")) + "</small></div></div><div class='audit-items'>" + cards + "</div>";
}

async function runAudit() {
  if (!projectFiles.length) return showToast(t("auditNeedProject"));
  $("#run-audit").disabled = true;
  $("#run-audit").querySelector("span").textContent = state.language === "hi" ? "जाँच हो रही है…" : "Checking locally…";
  try {
    const response = await fetch(API + "/audit", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ files: projectFiles })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "The local check did not finish.");
    renderAudit(result);
    addActivity(result.page ? (state.language === "hi" ? "वेबसाइट जाँची: " : "Reviewed website: ") + result.page : "Website source check", "audit");
    showToast(t("auditReady"));
  } catch (error) {
    showToast(error.message || "Could not run the local website check.");
  } finally {
    $("#run-audit").disabled = !projectFiles.length;
    $("#run-audit").querySelector("span").textContent = state.language === "hi" ? "ऑफलाइन वेबसाइट जाँचें" : "Run offline website check";
  }
}

function appendMessage(role, content) {
  state.messages.push({ role, content, time: new Date().toISOString() });
  state.messages = state.messages.slice(-80);
  saveState();
  renderMessages();
}

async function sendChat(message) {
  if (isSending) return;
  if (!state.model) {
    showToast(t("localMissing"));
    $("#model-dialog").showModal();
    return;
  }
  isSending = true;
  $("#thinking").classList.remove("hidden");
  $("#send-message").disabled = true;
  appendMessage("user", message);
  const previousHistory = state.messages.slice(0, -1).slice(-10).map(({ role, content }) => ({ role, content }));
  addActivity(message.length > 66 ? message.slice(0, 63) + "…" : message, "chat");
  try {
    const response = await fetch(API + "/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: state.model, message, history: previousHistory, files: projectFiles })
    });
    const result = await response.json();
    if (!response.ok) {
      const error = new Error(result.error || t("askError"));
      error.code = result.code;
      throw error;
    }
    appendMessage("assistant", result.answer);
  } catch (error) {
    const text = error.message || t("askError");
    appendMessage("assistant", text + (error.code === "local_model_missing" ? "\n\n" + t("localMissing") : ""));
  } finally {
    isSending = false;
    $("#thinking").classList.add("hidden");
    $("#send-message").disabled = false;
    $("#message-input").focus();
  }
}

async function saveLastAnswer() {
  if (!lastAnswer) return;
  const markdown = "# KaamSaathi draft\n\n" + lastAnswer + "\n";
  try {
    if (projectHandle && typeof projectHandle.getDirectoryHandle === "function") {
      try {
        let permission = await projectHandle.queryPermission({ mode: "readwrite" });
        if (permission !== "granted") permission = await projectHandle.requestPermission({ mode: "readwrite" });
        if (permission === "granted") {
          const directory = await projectHandle.getDirectoryHandle("KaamSaathi-Drafts", { create: true });
          const filename = "draft-" + new Date().toISOString().replace(/[:.]/g, "-") + ".md";
          const file = await directory.getFileHandle(filename, { create: true });
          const writable = await file.createWritable();
          await writable.write(markdown);
          await writable.close();
          addActivity((state.language === "hi" ? "ड्राफ्ट सेव किया: " : "Saved draft: ") + filename, "draft");
          showToast(t("saved"));
          return;
        }
      } catch {
        // If this browser cannot grant write access, download the draft instead.
      }
    }
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "kaamsaathi-draft-" + new Date().toISOString().slice(0, 10) + ".md";
    anchor.click();
    URL.revokeObjectURL(url);
    addActivity(state.language === "hi" ? "ड्राफ्ट डाउनलोड किया" : "Downloaded a draft", "draft");
    showToast(t("downloaded"));
  } catch (error) {
    showToast(t("saveError"));
  }
}

async function startModelDownload(model) {
  if (!localStatus || !localStatus.runtime_available) return showToast(t("runtimeMissing"));
  const confirmed = window.confirm(t("downloadNeedsInternet") + "\n\n" + model);
  if (!confirmed) return;
  try {
    const response = await fetch(API + "/models/pull", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not start model download.");
    $("#pull-progress").classList.remove("hidden");
    $("#pull-status").textContent = state.language === "hi" ? "डाउनलोड शुरू हुआ" : "Download started";
    statusTimer = statusTimer || setInterval(refreshStatus, 1800);
    refreshStatus();
  } catch (error) {
    showToast(error.message);
  }
}

document.querySelectorAll(".nav-item").forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
$("#choose-project").addEventListener("click", selectProjectFolder);
$("#audit-choose-project").addEventListener("click", selectProjectFolder);
$("#run-audit").addEventListener("click", runAudit);
$("#open-models").addEventListener("click", () => { renderModelDialog(); $("#model-dialog").showModal(); });
$("#open-privacy").addEventListener("click", () => $("#privacy-dialog").showModal());
$("#language-toggle").addEventListener("click", () => {
  state.language = state.language === "en" ? "hi" : "en";
  applyLanguage();
  renderMessages();
  renderHistory();
  renderProjectSummary();
  renderModelDialog();
  renderConnection();
  saveState();
});
$("#text-toggle").addEventListener("click", () => {
  state.largeText = !state.largeText;
  document.body.classList.toggle("large-text", state.largeText);
  applyLanguage();
  saveState();
});
$("#chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = $("#message-input");
  const message = input.value.trim();
  if (!message) return;
  input.value = "";
  sendChat(message);
});
document.querySelectorAll(".quick-prompt").forEach((button) => button.addEventListener("click", () => {
  const prompt = button.dataset.prompt;
  sendChat(prompt);
}));
$("#save-draft").addEventListener("click", saveLastAnswer);
$("#clear-history").addEventListener("click", () => {
  if (!window.confirm(state.language === "hi" ? "इस ब्राउज़र से आपकी लोकल चैट और गतिविधि मिटाएँ?" : "Clear local chat and activity from this browser?")) return;
  state.messages = [];
  state.activity = [];
  saveState();
  renderMessages();
  renderHistory();
  showToast(t("cleared"));
});
$("#model-options").addEventListener("click", (event) => {
  const download = event.target.closest("[data-download-model]");
  const choose = event.target.closest("[data-use-model]");
  if (download) startModelDownload(download.dataset.downloadModel);
  if (choose) {
    state.model = choose.dataset.useModel;
    saveState();
    renderConnection();
    renderModelDialog();
    showToast((state.language === "hi" ? "लोकल मॉडल चुना: " : "Selected local model: ") + state.model);
  }
});

applyLanguage();
document.body.classList.toggle("large-text", state.largeText);
renderMessages();
renderHistory();
renderProjectSummary();
refreshStatus();
statusTimer = setInterval(refreshStatus, 10000);
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}

