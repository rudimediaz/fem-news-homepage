import "@fontsource/inter";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "./styles.css";

const navMaster = document.getElementById("nav-master");
const navToggle = document.getElementById("nav-toggle");
const navAgents = document.querySelectorAll(
  "[data-navigation-agent]"
);

const screenMediaLarge = matchMedia("(width > 35em)");

// prevent unexpected expanding menu because of media change
screenMediaLarge.addEventListener("change", function (ev) {
  if (ev.matches) {
    setAriaExpanded.call(navToggle, "false");
  }
});

// disable scroll when menu expanded
document.body.addEventListener("nav:toggled", function (ev) {
  if (ev.detail.navigationState === "expanded") {
    this.style.setProperty("overflow-y", "hidden");
  } else {
    this.style.setProperty("overflow-y", "auto");
  }
});

navMaster.addEventListener("nav:toggled", function (ev) {
  for (const navAgent of navAgents) {
    navAgent.dataset.navigationState = ev.detail.navigationState;
  }
});

navToggle.addEventListener("click", function () {
  toggleAriaExpanded.call(this);
});

function getAriaExpanded() {
  return this.getAttribute("aria-expanded");
}

function setAriaExpanded(value) {
  this.setAttribute("aria-expanded", value);

  // when aria expanded has been set, it emits new bubbling up event
  queueMicrotask(() => {
    const current = getAriaExpanded.call(this);
    this.dispatchEvent(
      new CustomEvent("nav:toggled", {
        bubbles: true,
        detail: {
          navigationState: current === "true" ? "expanded" : "",
        },
      })
    );
  });
}

function toggleAriaExpanded() {
  const current = getAriaExpanded.call(this);

  if (current === "true") {
    setAriaExpanded.call(this, "false");
  } else if (current === "false") {
    setAriaExpanded.call(this, "true");
  }
}
