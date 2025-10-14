// includes.js
async function loadInclude(el, url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const html = await res.text();
    el.innerHTML = html;

    // Execute any <script> inside included HTML
    const scripts = el.querySelectorAll("script");
    scripts.forEach(old => {
      const script = document.createElement("script");
      if (old.src) {
        script.src = old.src;
        script.async = false; // keep order
      } else {
        script.textContent = old.textContent;
      }
      old.replaceWith(script);
    });

  } catch (err) {
    console.error("Include failed:", url, err);
    // Optional: show fallback UI
    el.innerHTML = `<!-- Failed to load ${url} -->`;
  }
}

async function initIncludes() {
  const includes = document.querySelectorAll("[data-include]");
  const promises = [];
  includes.forEach(el => {
    const url = el.getAttribute("data-include");
    if (url) promises.push(loadInclude(el, url));
  });
  await Promise.all(promises);

  // ✅ Dispatch custom event once all includes are done
  window.dispatchEvent(new Event("includesLoaded"));
}

document.addEventListener("DOMContentLoaded", initIncludes);

