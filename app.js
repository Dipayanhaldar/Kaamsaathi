const STORAGE_KEY = "kaamsaathi-demo-v1";
const starterState = {
  language: "en",
  largeText: false,
  tracking: false,
  projects: [{ id: "creator-site", name: "My creator website", kind: "Website", note: "Your first workspace" }],
  activities: [],
  plan: null
};

let state = loadState();
let toastTimer;
const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return saved ? { ...structuredClone(starterState), ...saved } : structuredClone(starterState);
  } catch {
    return structuredClone(starterState);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    toast("This browser could not save your demo data.");
  }
}

function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove("show"), 2600);
}

function formatTime(iso) {
  return new Intl.DateTimeFormat(state.language === "hi" ? "hi-IN" : "en-IN", { hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

function renderProjects() {
  const select = $("#project-select");
  const selected = select.value;
  select.innerHTML = state.projects.map((project) => `<option value="${escapeHtml(project.id)}">${escapeHtml(project.name)}</option>`).join("");
  if (state.projects.some((project) => project.id === selected)) select.value = selected;
  $("#project-count").textContent = String(state.projects.length);
  const icons = { Website: "▣", Content: "◉", Business: "◇", Other: "✦" };
  $("#project-grid").innerHTML = state.projects.map((project) => `
    <article class="project-card">
      <div class="project-top"><span class="project-icon" aria-hidden="true">${icons[project.kind] || "✦"}</span><span class="project-type">${escapeHtml(project.kind)}</span></div>
      <h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.note || "Added to your workspace")}</p><span class="project-arrow" aria-hidden="true">↗</span>
    </article>`).join("");
}

function renderActivity() {
  const list = $("#activity-list");
  const entries = state.activities.slice(0, 5);
  if (!entries.length) {
    list.innerHTML = `<div class="empty-activity">${state.language === "hi" ? "आपके काम यहाँ दिखेंगे, जब आप कोई काम शुरू करेंगे।" : "Your work will appear here when you start a task."}</div>`;
    return;
  }
  list.innerHTML = entries.map((item) => `<div class="activity-row"><span class="activity-icon" aria-hidden="true">${item.done ? "✓" : "◷"}</span><div class="activity-copy"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.projectName)} · ${item.done ? (state.language === "hi" ? "पूरा हुआ" : "Completed") : (state.language === "hi" ? "योजना बनी" : "Plan created")}</small></div><time class="activity-time">${formatTime(item.time)}</time></div>`).join("");
}

function renderTracking() {
  const button = $("#tracking-toggle");
  button.classList.toggle("is-on", state.tracking);
  button.querySelector("span:last-child").textContent = state.tracking
    ? (state.language === "hi" ? "केवल दर्ज किए काम चालू" : "Only entered tasks · on")
    : (state.language === "hi" ? "काम की ट्रैकिंग बंद है" : "Task tracking is off");
}

function renderPlan() {
  const container = $("#plan-section");
  if (!state.plan) {
    container.classList.add("hidden");
    container.innerHTML = "";
    return;
  }
  container.classList.remove("hidden");
  const steps = state.plan.steps.map((step, index) => `<li class="plan-step"><button class="step-check ${step.done ? "done" : ""}" data-step="${index}" aria-label="${step.done ? "Mark incomplete" : "Mark complete"}">${step.done ? "✓" : ""}</button><span>${escapeHtml(step.text)}</span></li>`).join("");
  const completed = state.plan.steps.filter((step) => step.done).length;
  container.innerHTML = `
    <div class="plan-head"><span class="plan-mark">✦</span><div><h2 id="plan-heading">${state.language === "hi" ? "आपकी योजना तैयार है" : "Here’s a simple plan"}</h2><p>“${escapeHtml(state.plan.goal)}” · ${escapeHtml(state.plan.projectName)}</p></div></div>
    <ol class="plan-list">${steps}</ol>
    <div class="plan-actions"><small>${state.language === "hi" ? "डेमो उत्तर · कोई AI मॉडल या डिवाइस नियंत्रण जुड़ा नहीं है।" : "Demo response · no AI model or device control is connected."}<br>${state.language === "hi" ? `${completed} में से ${state.plan.steps.length} चरण पूरे` : `${completed} of ${state.plan.steps.length} steps complete`}</small><button class="primary-button" id="complete-plan-button"><span>${completed === state.plan.steps.length ? (state.language === "hi" ? "योजना बंद करें" : "Close plan") : (state.language === "hi" ? "इस योजना को सहेजें" : "Save this plan")}</span><span>${completed === state.plan.steps.length ? "✓" : "→"}</span></button></div>`;
  container.querySelectorAll("[data-step]").forEach((button) => button.addEventListener("click", () => toggleStep(Number(button.dataset.step))));
  $("#complete-plan-button").addEventListener("click", closeOrSavePlan);
}

function renderLanguage() {
  document.documentElement.lang = state.language;
  document.querySelectorAll("[data-en][data-hi]").forEach((element) => { element.textContent = element.dataset[state.language]; });
  $("#language-toggle").textContent = state.language === "en" ? "हिं / EN" : "EN / हिं";
  $("#task-input").placeholder = $("#task-input").dataset[`placeholder${state.language === "en" ? "En" : "Hi"}`];
}

function render() {
  document.body.classList.toggle("large-text", state.largeText);
  $("#text-size-toggle").setAttribute("aria-pressed", String(state.largeText));
  renderLanguage();
  renderProjects();
  renderActivity();
  renderTracking();
  renderPlan();
  saveState();
}

function makeDemoSteps(goal) {
  const text = goal.toLowerCase();
  if (/website|site|page|landing/.test(text)) return ["Clarify who the page is for and its main goal", "Review the page structure and the words visitors see first", "List the three most useful improvements", "Show suggested edits for your review"];
  if (/video|reel|short|content|creator|caption/.test(text)) return ["Choose the audience and one clear message", "Draft a short outline or script", "Prepare a caption and a simple call to action", "Show the draft for your review"];
  if (/organ|next step|plan|project|task/.test(text)) return ["Break the goal into small steps", "Put the steps in a useful order", "Mark anything that needs your decision", "Save the checklist in this demo"];
  return ["Restate the goal in simple words", "Gather the project context you choose to share", "Prepare a safe step-by-step plan", "Show the plan for your approval"];
}

function addActivity(title, projectName, done = false) {
  state.activities.unshift({ title, projectName, done, time: new Date().toISOString() });
  state.activities = state.activities.slice(0, 12);
}

function createPlan(goal) {
  const project = state.projects.find((item) => item.id === $("#project-select").value) || state.projects[0];
  if (!project) return toast(state.language === "hi" ? "पहले एक प्रोजेक्ट जोड़ें।" : "Add a project first.");
  state.plan = { goal: goal.trim(), projectName: project.name, steps: makeDemoSteps(goal).map((text) => ({ text, done: false })) };
  addActivity(goal.trim(), project.name);
  render();
  $("#plan-section").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function toggleStep(index) {
  if (!state.plan?.steps[index]) return;
  state.plan.steps[index].done = !state.plan.steps[index].done;
  render();
}

function closeOrSavePlan() {
  if (!state.plan) return;
  const completed = state.plan.steps.every((step) => step.done);
  if (!completed) {
    toast(state.language === "hi" ? "चरणों को चुनकर अपनी प्रगति दर्ज करें।" : "Mark the steps you’ve completed first.");
    return;
  }
  const entry = state.activities.find((item) => item.title === state.plan.goal && item.projectName === state.plan.projectName);
  if (entry) entry.done = true;
  state.plan = null;
  render();
  toast(state.language === "hi" ? "योजना पूरी हुई।" : "Plan completed.");
}

$("#task-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const goal = $("#task-input").value.trim();
  if (!goal) return;
  createPlan(goal);
  $("#task-input").value = "";
});

document.querySelectorAll(".suggestion").forEach((button) => button.addEventListener("click", () => {
  $("#task-input").value = button.dataset.prompt;
  $("#task-input").focus();
}));

$("#add-project-button").addEventListener("click", () => $("#project-dialog").showModal());
$("#close-project-dialog").addEventListener("click", () => $("#project-dialog").close());
$("#project-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = $("#project-name").value.trim();
  if (!name) return;
  const kind = $("#project-kind").value;
  state.projects.push({ id: crypto.randomUUID(), name, kind, note: "Added to your workspace" });
  $("#project-form").reset();
  $("#project-dialog").close();
  render();
  toast(state.language === "hi" ? "प्रोजेक्ट जुड़ गया।" : "Project added.");
});

$("#tracking-toggle").addEventListener("click", () => {
  state.tracking = !state.tracking;
  render();
  toast(state.tracking ? (state.language === "hi" ? "केवल यहाँ दर्ज काम दिखेंगे।" : "Only tasks entered here will be listed.") : (state.language === "hi" ? "ट्रैकिंग बंद है।" : "Task tracking is off."));
});
$("#language-toggle").addEventListener("click", () => { state.language = state.language === "en" ? "hi" : "en"; render(); });
$("#text-size-toggle").addEventListener("click", () => { state.largeText = !state.largeText; render(); });
$("#privacy-button").addEventListener("click", () => $("#privacy-dialog").showModal());

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}

render();

