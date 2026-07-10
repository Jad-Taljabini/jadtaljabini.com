const projects = {
  hostario: {
    name: "Hostario",
    externalLabel: "View Hostario on the App Store ↗",
    externalUrl: "https://apps.apple.com/it/app/hostario/id6753862247",
    steps: [
      {
        label: "Capture",
        title: "Start with the guest document.",
        description: "Scan an identity document instead of copying every field by hand. Hostario turns the capture into structured guest data ready for review.",
        image: "assets/walkthrough/hostario-01.webp",
        alt: "Conceptual illustration of a guest identity document being scanned"
      },
      {
        label: "Review",
        title: "Keep people in control of the data.",
        description: "Recognised details are presented for a deliberate check before anything leaves the device. Corrections stay simple and visible.",
        image: "assets/walkthrough/hostario-02.webp",
        alt: "Conceptual illustration of structured guest details being reviewed"
      },
      {
        label: "Report",
        title: "Send the right data to official systems.",
        description: "The same verified guest record can be prepared for the required Italian reporting services, reducing repetitive work and avoidable mistakes.",
        image: "assets/walkthrough/hostario-03.webp",
        alt: "Conceptual illustration of verified data moving to official reporting systems"
      },
      {
        label: "Complete",
        title: "Finish the stay without scattered tools.",
        description: "Contracts, receipts and tourist-tax summaries stay connected to the same workflow, so the administrative trail is easier to understand and retrieve.",
        image: "assets/walkthrough/hostario-04.webp",
        alt: "Conceptual illustration of contracts, receipts and tourist tax records together"
      }
    ]
  },
  "water-alert": {
    name: "Water Alert",
    externalLabel: "View Water Alert on the App Store ↗",
    externalUrl: "https://apps.apple.com/it/app/water-alert/id6443403237?l=en-GB",
    steps: [
      {
        label: "Set up",
        title: "Turn a vague intention into a daily target.",
        description: "Choose a hydration goal that gives the day a clear finish line, without turning a basic habit into a complicated dashboard.",
        image: "assets/walkthrough/water-alert-01.webp",
        alt: "Conceptual illustration of a personal daily hydration target"
      },
      {
        label: "Log",
        title: "Record water in the moment.",
        description: "Add a drink in seconds from iPhone, iPad or Apple Watch. The interaction is intentionally short, because useful tracking should not interrupt the habit itself.",
        image: "assets/walkthrough/water-alert-02.webp",
        alt: "Conceptual illustration of quickly logging a glass of water"
      },
      {
        label: "Remember",
        title: "Get a prompt when the day gets busy.",
        description: "Gentle reminders bring the goal back at the right time. They support the routine without demanding constant attention.",
        image: "assets/walkthrough/water-alert-03.webp",
        alt: "Conceptual illustration of a subtle hydration reminder"
      },
      {
        label: "Understand",
        title: "See progress across the Apple ecosystem.",
        description: "A shared view across devices makes the day easy to read, while HealthKit integration keeps hydration data part of the broader health picture.",
        image: "assets/walkthrough/water-alert-04.webp",
        alt: "Conceptual illustration of hydration progress shared across Apple devices"
      }
    ]
  },
  havannah: {
    name: "Havannah UI Fuzzer",
    externalLabel: "Explore the project on GitHub ↗",
    externalUrl: "https://github.com/Jad-Taljabini/rlc/tree/UI_Fuzzer/projects/Havannah",
    steps: [
      {
        label: "Generate",
        title: "Treat the interface as a sequence of events.",
        description: "The engine builds long combinations of clicks, board choices and resets that would be tedious and unreliable to explore manually.",
        image: "assets/walkthrough/havannah-01.webp",
        alt: "Conceptual illustration of event sequences entering a hexagonal game board"
      },
      {
        label: "Measure",
        title: "Reward behaviour the test has not seen before.",
        description: "Semantic coverage tracks turns, board regions, local stone context and terminal states, so exploration is guided by meaningful game behaviour rather than raw line counts alone.",
        image: "assets/walkthrough/havannah-02.webp",
        alt: "Conceptual illustration of semantic coverage spreading across a hexagonal board"
      },
      {
        label: "Evolve",
        title: "Mutate the inputs that open new paths.",
        description: "Promising sequences enter a corpus and are changed, recombined and scheduled again. Different strategies balance novelty, execution time and discovered failures.",
        image: "assets/walkthrough/havannah-03.webp",
        alt: "Conceptual illustration of one test sequence branching into new mutations"
      },
      {
        label: "Detect",
        title: "Turn strange behaviour into reproducible bugs.",
        description: "Invariants catch failures such as stale canvases, invalid labels and actions after a finished match, while the event context helps separate distinct bug families.",
        image: "assets/walkthrough/havannah-04.webp",
        alt: "Conceptual illustration of a failed game state isolated with its event trace"
      }
    ]
  },
  intouch: {
    name: "inTouch",
    externalLabel: "Open the research poster ↗",
    externalUrl: "docs/Indoor_Location_Detection_Poster.pdf",
    steps: [
      {
        label: "Discover",
        title: "Listen for Bluetooth signals in the room.",
        description: "The native iOS tool observes nearby beacons and turns invisible radio activity into a consistent stream of measurements for the study.",
        image: "assets/walkthrough/intouch-01.webp",
        alt: "Conceptual illustration of Bluetooth beacons transmitting inside a room"
      },
      {
        label: "Capture",
        title: "Collect signal strength with useful context.",
        description: "Each observation is recorded with the information needed for later analysis, creating a dataset that can connect changing radio patterns to physical space.",
        image: "assets/walkthrough/intouch-02.webp",
        alt: "Conceptual illustration of Bluetooth signal measurements being collected"
      },
      {
        label: "Infer",
        title: "Estimate where occupancy is happening.",
        description: "Patterns across multiple signals help researchers reason about indoor presence without relying on a conventional location system.",
        image: "assets/walkthrough/intouch-03.webp",
        alt: "Conceptual illustration of indoor occupancy inferred from several beacon signals"
      },
      {
        label: "Research",
        title: "Move from app data to environmental insight.",
        description: "The captured dataset supports analysis of how people use indoor environments, connecting a focused mobile tool to a wider environmental-health question.",
        image: "assets/walkthrough/intouch-04.webp",
        alt: "Conceptual illustration of indoor signal data becoming a research map"
      }
    ]
  }
};

const dialog = document.querySelector("#project-walkthrough");
const projectName = document.querySelector("#walkthrough-project");
const position = document.querySelector("#walkthrough-position");
const stepLabel = document.querySelector("#walkthrough-step-label");
const title = document.querySelector("#walkthrough-title");
const description = document.querySelector("#walkthrough-description");
const image = document.querySelector("#walkthrough-image");
const dots = document.querySelector("#walkthrough-dots");
const external = document.querySelector("#walkthrough-external");
const back = document.querySelector("[data-walkthrough-back]");
const next = document.querySelector("[data-walkthrough-next]");
const close = document.querySelector("[data-close-walkthrough]");

let activeProject = null;
let activeStep = 0;

function renderStep() {
  const project = projects[activeProject];
  const step = project.steps[activeStep];
  const finalStep = activeStep === project.steps.length - 1;

  projectName.textContent = project.name;
  position.textContent = `${String(activeStep + 1).padStart(2, "0")} / ${String(project.steps.length).padStart(2, "0")}`;
  stepLabel.textContent = step.label;
  title.textContent = step.title;
  description.textContent = step.description;
  image.src = window.walkthroughImages?.[step.image] ?? step.image;
  image.alt = step.alt;
  external.textContent = project.externalLabel;
  external.href = project.externalUrl;
  back.disabled = activeStep === 0;
  next.innerHTML = finalStep ? "Close" : "Next <span aria-hidden=\"true\">→</span>";

  dots.replaceChildren(...project.steps.map((item, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "walkthrough-dot";
    dot.setAttribute("aria-label", `Go to step ${index + 1}: ${item.label}`);
    dot.setAttribute("aria-current", index === activeStep ? "step" : "false");
    dot.addEventListener("click", () => {
      activeStep = index;
      renderStep();
    });
    return dot;
  }));
}

function openProject(projectId) {
  activeProject = projectId;
  activeStep = 0;
  renderStep();
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

function closeWalkthrough() {
  dialog.close();
  document.body.classList.remove("dialog-open");
}

document.querySelectorAll("[data-open-project]").forEach((button) => {
  button.addEventListener("click", () => openProject(button.dataset.openProject));
});

back.addEventListener("click", () => {
  if (activeStep > 0) {
    activeStep -= 1;
    renderStep();
  }
});

next.addEventListener("click", () => {
  const finalStep = activeStep === projects[activeProject].steps.length - 1;
  if (finalStep) {
    closeWalkthrough();
    return;
  }
  activeStep += 1;
  renderStep();
});

close.addEventListener("click", closeWalkthrough);

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeWalkthrough();
});

dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));

dialog.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") next.click();
  if (event.key === "ArrowLeft" && !back.disabled) back.click();
});
