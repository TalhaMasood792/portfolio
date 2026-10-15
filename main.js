import { profile, projects, categories, experience, clients } from "./data/profile.js";

const $ = (id) => document.getElementById(id);
const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const isPlaceholder = (s) => /^EDIT\b/.test(String(s).trim());
const real = (list) => list.filter((x) => !isPlaceholder(x));

/* ---------- Profile ---------- */
function renderProfile() {
  document.title = `${profile.name} · Software engineer`;
  $("brand").textContent = profile.name;
  $("availability").textContent = profile.availability;
  $("hero-title").textContent = profile.name;
  $("hero-role").textContent = profile.role;
  $("hero-intro").textContent = profile.intro;
  for (const id of ["nav-cv", "hero-cv"]) {
    $(id).href = profile.resumeUrl;
    $(id).setAttribute("download", `${profile.name.replace(/\s+/g, "-")}-Resume.pdf`);
  }

  $("reach-title").innerHTML = `Products I've worked on are used by organisations including`;
  $("reach-list").innerHTML = clients.map((c) => `<li>${esc(c)}</li>`).join("");
  $("reach-list").setAttribute("aria-label", clients.join(", "));

  $("about-body").innerHTML = real(profile.about).map((p) => `<p>${esc(p)}</p>`).join("");
  $("skills").innerHTML = Object.entries(profile.skills)
    .map(([g, list]) => `<div><h3>${esc(g)}</h3><ul>${list.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>`)
    .join("");
  renderContact();
  $("footer-text").textContent = `© ${new Date().getFullYear()} ${profile.name}. Hand-built with HTML, CSS and JavaScript.`;
}

/* ---------- Contact ---------- */
const ICONS = {
  mail: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  person: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M7 18c1-2.5 3-3.5 5-3.5s4 1 5 3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  code: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  doc: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 3v5h5M9 13h6M9 17h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
};
const shortUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function renderContact() {
  $("contact-lede").textContent = `${profile.availability}. Email is the quickest way to reach me, or connect on LinkedIn.`;
  $("contact-email-btn").href = `mailto:${profile.email}`;
  const resumeName = `${profile.name.replace(/\s+/g, "-")}-Resume.pdf`;
  const rows = [
    { icon: "mail", label: "Email", value: profile.email, href: `mailto:${profile.email}`, go: "Write" },
    { icon: "person", label: "LinkedIn", value: shortUrl(profile.linkedin), href: profile.linkedin, go: "Open", external: true },
    { icon: "code", label: "GitHub", value: shortUrl(profile.github), href: profile.github, go: "Open", external: true },
    { icon: "doc", label: "Resume", value: "Download PDF", href: profile.resumeUrl, go: "PDF", download: resumeName },
  ].filter((r) => r.href && !/your-username|example\.com/.test(r.href));
  $("contact-list").innerHTML = rows.map((r) => `
    <li><a href="${esc(r.href)}"${r.external ? ' target="_blank" rel="noopener"' : ""}${r.download ? ` download="${esc(r.download)}" type="application/pdf"` : ""}>
      <span class="ic">${ICONS[r.icon]}</span>
      <span class="txt"><small>${r.label}</small><b>${esc(r.value)}</b></span>
      <span class="go" aria-hidden="true">${r.go}</span>
    </a></li>`).join("");

  $("copy-email").addEventListener("click", async () => {
    let ok = false;
    try { await navigator.clipboard.writeText(profile.email); ok = true; } catch {
      const t = document.createElement("textarea");
      t.value = profile.email; document.body.appendChild(t); t.select();
      try { ok = document.execCommand("copy"); } catch {}
      t.remove();
    }
    $("copy-status").textContent = ok ? `Copied ${profile.email}` : `Copy this address: ${profile.email}`;
    clearTimeout(renderContact.t);
    renderContact.t = setTimeout(() => ($("copy-status").textContent = ""), 4000);
  });
}

/* ---------- Experience ---------- */
function renderExperience() {
  $("timeline").innerHTML = experience.map((e) => {
    const stack = real(e.stack);
    return `
      <li class="job">
        <div class="job-when"><strong>${esc(e.company)}</strong>${esc(e.period)}</div>
        <div>
          <h3 class="job-role">${esc(e.role)}</h3>
          <p class="job-summary">${esc(e.summary)}</p>
          ${real(e.points).length ? `<ul class="points">${real(e.points).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
          ${stack.length ? `<ul class="stack" aria-label="Tech used">${stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : ""}
        </div>
      </li>`;
  }).join("");
}

/* ---------- Projects ---------- */
function statusBadge(p) {
  if (p.status === "confidential") return `<span class="status status-prod">In production${p.company ? ` at ${esc(p.company)}` : ""}</span>`;
  if (p.status === "live") return `<span class="status status-live">Live</span>`;
  return `<span class="status status-local">${p.demoVideo ? "Demo video" : "Source code"}</span>`;
}

function projectLinks(p) {
  const out = [];
  if (p.status === "live" && p.liveUrl) out.push(`<a class="primary" href="${esc(p.liveUrl)}" target="_blank" rel="noopener">Visit site<span class="sr-only"> for ${esc(p.title)}</span></a>`);
  if (p.demoVideo) out.push(`<a class="${p.status === "live" ? "" : "primary"}" href="${esc(p.demoVideo)}" target="_blank" rel="noopener">Watch demo<span class="sr-only"> of ${esc(p.title)}</span></a>`);
  if (p.repoUrl) out.push(`<a href="${esc(p.repoUrl)}" target="_blank" rel="noopener">View code<span class="sr-only"> for ${esc(p.title)}</span></a>`);
  return `<div class="links">${out.join("")}</div>`;
}

function media(p) {
  if (p.image) return `<img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" loading="lazy" />`;
  const letters = p.title.split(/\s+/).map((w) => w[0]).join("").slice(0, 3);
  return `<div class="placeholder" aria-hidden="true"><span>${esc(letters)}</span></div>`;
}

const stackList = (p) => `<ul class="stack" aria-label="Tech stack">${p.stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`;
const mainLink = (p) => (p.status === "live" && p.liveUrl) || p.demoVideo || p.repoUrl || "";

function renderFeatured() {
  $("featured").innerHTML = projects.filter((p) => p.featured && p.category !== "security").map((p) => {
    const href = mainLink(p);
    const pic = href
      ? `<a class="feature-media" href="${esc(href)}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">${media(p)}</a>`
      : `<div class="feature-media">${media(p)}</div>`;
    return `
      <article class="feature">
        ${pic}
        <div>
          <div class="meta-row">${statusBadge(p)}<span class="cat">${esc(categories[p.category])}</span></div>
          <h3>${esc(p.title)}</h3>
          <p class="tagline">${esc(p.tagline)}</p>
          <p class="desc">${esc(p.description)}</p>
          ${p.highlights.length ? `<ul class="highlights">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
          ${p.challenge ? `<p class="challenge"><b>Under the hood</b>${esc(p.challenge)}</p>` : ""}
          ${stackList(p)}
          ${projectLinks(p)}
        </div>
      </article>`;
  }).join("");
}

function renderSecurity() {
  $("security-list").innerHTML = projects.filter((p) => p.category === "security").map((p) => `
      <article class="feature">
        <figure class="feature-media mock">
          ${media(p)}
          <figcaption>Illustrative mockup · sample data</figcaption>
        </figure>
        <div>
          <div class="meta-row">${statusBadge(p)}<span class="cat">Confidential</span></div>
          <h3>${esc(p.title)}</h3>
          <p class="tagline">${esc(p.tagline)}</p>
          <p class="desc">${esc(p.description)}</p>
          ${p.highlights.length ? `<ul class="highlights">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
          ${real(p.stack).length ? `<ul class="stack" aria-label="Areas">${real(p.stack).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
        </div>
      </article>`).join("");
}

let activeTab = "all";
function renderGrid() {
  const rest = projects.filter((p) => !p.featured && p.category !== "security");
  const cats = [...new Set(rest.map((p) => p.category))];
  $("tabs").innerHTML = [["all", "All"], ...cats.map((c) => [c, categories[c]])]
    .map(([k, l]) => `<button type="button" data-tab="${k}" aria-pressed="${k === activeTab}">${esc(l)}</button>`)
    .join("");
  $("tabs").hidden = cats.length < 2;
  $("grid").innerHTML = rest.filter((p) => activeTab === "all" || p.category === activeTab).map((p) => `
    <li class="card">
      <div class="card-media">${media(p)}</div>
      <div class="card-body">
        <div class="meta-row">${statusBadge(p)}<span class="cat">${esc(categories[p.category])}</span></div>
        <h3>${esc(p.title)}</h3>
        <p class="tagline">${esc(p.tagline)}</p>
        <p class="desc">${esc(p.description)}</p>
        ${stackList(p)}
        ${projectLinks(p)}
      </div>
    </li>`).join("");
}
$("tabs").addEventListener("click", (e) => {
  const b = e.target.closest("[data-tab]");
  if (!b) return;
  activeTab = b.dataset.tab;
  renderGrid();
  $("tabs").querySelector(`[data-tab="${activeTab}"]`).focus();
});

/* ---------- Chat assistant ---------- */
const history = [];
const firstName = profile.name.split(" ")[0];
const suggestions = [
  "What products have you built?",
  "What do you work on at Trellix?",
  "What business systems have you built?",
  "What's your tech stack?",
  "How can I contact you?",
];

function addMessage(role, text, extra = "") {
  const el = document.createElement("div");
  el.className = `msg ${role === "user" ? "msg-user" : "msg-bot"} ${extra}`.trim();
  el.textContent = text;
  $("chat-log").appendChild(el);
  $("chat-log").scrollTop = $("chat-log").scrollHeight;
  return el;
}

const named0 = (t) => projects.find((p) => t.includes(p.title.toLowerCase()) || t.includes(p.id));
const listOf = (arr) => arr.map((p) => `${p.title} (${p.tagline})`).join(", ");

// Answers from profile data when the AI endpoint isn't configured
function localAnswer(q) {
  const t = q.toLowerCase();
  const job = experience.find((e) => t.includes(e.company.toLowerCase()));
  if (job) {
    const pts = real(job.points);
    return `${firstName} is a ${job.role} at ${job.company} (${job.period}). ${job.summary}${pts.length ? " " + pts.join(" ") : ""}`;
  }
  const sec = projects.filter((p) => p.category === "security");
  if (/product|security|threat|phish|ndr|network|anomal|intel|cyber|\bai\b|machine learning|ml\b/.test(t) && !named0(t))
    return `At work, ${firstName} has built ${listOf(sec)}, used by organisations including ${clients.join(", ")}. He has also built applications like ${listOf(projects.filter((p) => p.category === "business"))}. Ask about any one by name for details.`;
  if (/experience|work history|job|employ|company|career|google|walmart|samsung|aramco|client/.test(t)) {
    const [now] = experience;
    return `${firstName} is currently a ${now.role} at ${now.company}. ${now.summary} Other experience: ${experience.slice(1).map((e) => `${e.role} at ${e.company}`).join(", ") || "see the Experience section"}.`;
  }
  const named = projects.find((p) => t.includes(p.title.toLowerCase()) || t.includes(p.id));
  if (named) {
    if (named.status === "confidential") return `${named.title} (${named.tagline}): ${named.description} It's a confidential work product, so the screen on this site is an illustrative mockup.`;
    const where = named.status === "live" ? `Live at ${named.liveUrl}.` : `Code: ${named.repoUrl || "on GitHub"}.`;
    return `${named.title}: ${named.description} Built with ${named.stack.join(", ")}. ${where}`;
  }
  if (/business|enterprise|erp|invoice|inventory|helpdesk|service desk|system/.test(t))
    return `${firstName} has built ${listOf(projects.filter((p) => p.category === "business"))}. Each has role-based permissions, an audit log and approval rules. Ask about any one for details.`;
  if (/\bai\b|llm|gpt|artificial/.test(t))
    return `AI work includes ${listOf(projects.filter((p) => p.category === "ai"))}.`;
  if (/3d|three|globe|interactive|visual|chart|data/.test(t))
    return `Interactive work includes ${listOf(projects.filter((p) => p.category === "interactive"))}.`;
  if (/live|deployed|link|url|visit|project/.test(t))
    return `Live now: ${projects.filter((p) => p.status === "live").map((p) => p.title).join(", ")}. Links are in each project card.`;
  if (/stack|skill|tech|language|framework|tool/.test(t))
    return Object.entries(profile.skills).map(([g, l]) => `${g}: ${l.join(", ")}`).join("\n");
  if (/contact|email|hire|reach|available|freelance|role|cv|resume/.test(t))
    return `${profile.availability}. Email ${profile.email}, or connect on LinkedIn: ${profile.linkedin}`;
  return `${profile.intro} Try asking about Trellix, a project by name, the tech stack, or how to get in touch.`;
}

async function ask(question) {
  question = question.trim();
  if (!question) return;
  $("chat-chips").hidden = true;
  addMessage("user", question);
  history.push({ role: "user", content: question });
  const input = $("chat-input");
  const button = $("chat-form").querySelector("button");
  input.value = "";
  button.disabled = true;
  const typing = addMessage("bot", "Thinking…", "msg-typing");

  let reply;
  try {
    const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history }) });
    const data = await res.json().catch(() => ({}));
    reply = res.status === 429 ? data.error : res.ok && data.reply ? data.reply : localAnswer(question);
  } catch {
    reply = localAnswer(question);
  }
  typing.remove();
  addMessage("bot", reply);
  history.push({ role: "assistant", content: reply });
  button.disabled = false;
  input.focus();
}

function initChat() {
  addMessage("bot", `Hi. Ask me about ${firstName}'s products, his work at ${experience[0].company}, applications he's built, skills or availability.`);
  $("chat-chips").innerHTML = suggestions.map((s) => `<button type="button">${esc(s)}</button>`).join("");
  $("chat-chips").addEventListener("click", (e) => { if (e.target.matches("button")) ask(e.target.textContent); });
  $("chat-form").addEventListener("submit", (e) => { e.preventDefault(); ask($("chat-input").value); });
}

renderProfile();
renderExperience();
renderSecurity();
renderFeatured();
renderGrid();
initChat();
