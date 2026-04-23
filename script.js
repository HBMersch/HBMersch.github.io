const trainingGroups = [
  {
    id: "u4",
    title: "Kidssports U4",
    segment: "jugend",
    label: "Fruehbereich",
    color: "#e35d2f",
    colorDark: "#a53414",
    coach: "Gregory Redavid, Christophe Kremer, Marc Jungels, Max Blanc",
    slots: [
      "Mittwoch, 16:30-17:30, Omnisports, 21 rue des Pres, Mersch",
      "Samstag, 10:00-11:00, SportHall, 4 rue de l'Ecole, Lintgen",
    ],
  },
  {
    id: "u7",
    title: "U7",
    segment: "jugend",
    label: "Nachwuchs",
    color: "#ef7d22",
    colorDark: "#b95010",
    coach: "Max Blanc, Anne Holm",
    slots: [
      "Dienstag, 17:30-18:30, Sportshal Lintgen, 50 rue de la Gare",
      "Freitag, 16:30-17:30, Hall Omnisports Krounebierg, 11 rue de la Piscine, Mersch",
    ],
  },
  {
    id: "u9",
    title: "U9",
    segment: "jugend",
    label: "Nachwuchs",
    color: "#d94723",
    colorDark: "#922610",
    coach: "Max Blanc, Louis Van der Weken",
    slots: [
      "Dienstag, 17:30-19:00, Hall Omnisports Krounebierg, 11 rue de la Piscine, Mersch",
      "Donnerstag, 17:30-19:00, Hall Omnisports Krounebierg, 11 rue de la Piscine, Mersch",
    ],
  },
  {
    id: "u11",
    title: "U11",
    segment: "jugend",
    label: "Nachwuchs",
    color: "#b63a64",
    colorDark: "#772040",
    coach: "Max Blanc, Elie Schuster",
    slots: [
      "Mittwoch, 17:30-19:00, Hall Omnisports, 21 rue des Pres, Mersch",
      "Freitag, 17:30-19:00, Hall Omnisports Krounebierg, 11 rue de la Piscine, Mersch",
    ],
  },
  {
    id: "u13-u15",
    title: "U13 und U15",
    segment: "jugend",
    label: "Leistungsaufbau",
    color: "#6e43b6",
    colorDark: "#48297f",
    coach: "Max Blanc, Mathis Derneden",
    slots: [
      "Montag, 17:30-19:00, Hall Omnisports, 21 rue des Pres, Mersch",
      "Mittwoch, 18:30-20:00, Hall Omnisports, 21 rue des Pres, Mersch",
      "Freitag, 19:00-20:30, Hall Omnisports Krounebierg, 11 rue de la Piscine, Mersch",
    ],
  },
  {
    id: "girls-u9-u13",
    title: "Girls Group U9 bis U13",
    segment: "jugend",
    label: "Girls",
    color: "#d14c8a",
    colorDark: "#8f2656",
    coach: "Anne Bisenius Holm, Katarzyna Pietrasik",
    slots: ["Freitag, 17:30-19:00, Hall Omnisports, 21 rue des Pres, Mersch"],
  },
  {
    id: "frauen",
    title: "Frauen",
    segment: "aktiv",
    label: "Aktiv",
    color: "#1f8f74",
    colorDark: "#145844",
    coach: "Katarzyna Pietrasik",
    slots: [
      "Montag, 19:00-20:30, Hall Omnisports, 21 rue des Pres, Mersch",
      "Freitag, 19:00-20:30, Hall Omnisports, 21 rue des Pres, Mersch",
    ],
  },
  {
    id: "herren",
    title: "Herren S1, S2, U21 und U17",
    segment: "aktiv",
    label: "Aktiv",
    color: "#1d2b53",
    colorDark: "#0f1733",
    coach: "Laurent Metzler",
    slots: [
      "Montag, 20:30-21:30, Hall Omnisports, 21 rue des Pres, Mersch",
      "Mittwoch, 20:30-21:30, Hall Omnisports, 21 rue des Pres, Mersch",
      "Freitag, 20:30-21:30, Hall Omnisports Krounebierg, 11 rue de la Piscine, Mersch",
    ],
  },
];

const newsItems = [
  {
    date: "April 2026",
    title: "HB Mersch 75 mit neuem Online-Auftritt",
    text: "Die Vereinswebsite zeigt aktuelle Informationen zu Spielbetrieb, Training und Clubleben in klarer Form.",
  },
  {
    date: "Verein",
    title: "Spielbetrieb, Training und Clubinfos im Mittelpunkt",
    text: "Auf den wichtigsten Seiten finden Mitglieder, Familien und Interessierte schnell den richtigen Einstieg in den Verein.",
  },
  {
    date: "Clubleben",
    title: "Mitmachen bei HB Mersch 75",
    text: "Neue Spielerinnen, Spieler, Helfer und Partner sind willkommen und können den Verein direkt kontaktieren.",
  },
];

const trainingGrid = document.querySelector("#training-grid");
const trainingFilterBar = document.querySelector("#training-filter-bar");
const trainingGroupsContainer = document.querySelector("#training-groups-container");
const newsList = document.querySelector("#news-list");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const year = document.querySelector("#year");

const scheduleDayOrder = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];

function timeToMinutes(value) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToLabel(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (totalMinutes % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function parseTrainingSlot(slot, group) {
  const [day, timeRange, ...locationParts] = slot.split(",").map((part) => part.trim());
  const [startTime, endTime] = timeRange.split("-").map((part) => part.trim());

  return {
    id: group.id,
    title: group.title,
    label: group.label,
    segment: group.segment,
    coach: group.coach,
    color: group.color,
    colorDark: group.colorDark,
    day,
    startTime,
    endTime,
    startMinutes: timeToMinutes(startTime),
    endMinutes: timeToMinutes(endTime),
    location: locationParts.join(", "),
  };
}

function renderTrainingSchedule(groups, activeFilter = "all") {
  if (!trainingGroupsContainer) {
    return;
  }

  const filteredGroups =
    activeFilter === "all" ? groups : groups.filter((group) => group.id === activeFilter);

  const sections = [
    {
      id: "jugendbereich",
      title: "Jugendbereich",
      intro: "Fruehbereich, Nachwuchs und Aufbaugruppen fuer Kinder und Jugendliche.",
      items: filteredGroups.filter((group) => group.segment === "jugend"),
    },
    {
      id: "aktivbereich",
      title: "Aktivbereich",
      intro: "Frauen und Herren mit festen Trainingszeiten im Wochenrhythmus.",
      items: filteredGroups.filter((group) => group.segment === "aktiv"),
    },
  ];

  const visibleSections = sections.filter((section) => section.items.length > 0);

  if (visibleSections.length === 0) {
    trainingGroupsContainer.innerHTML = `
      <div class="training-empty-state">
        <strong>Keine Trainingsgruppe sichtbar</strong>
        <p>Waehle einen anderen Filter, um wieder Trainingszeiten anzuzeigen.</p>
      </div>
    `;
    return;
  }

  trainingGroupsContainer.innerHTML = visibleSections
    .map((section) => {
      const entries = section.items
        .flatMap((group) => group.slots.map((slot) => parseTrainingSlot(slot, group)))
        .sort((left, right) => left.startMinutes - right.startMinutes || left.day.localeCompare(right.day));

      const earliest = Math.min(...entries.map((entry) => entry.startMinutes));
      const latest = Math.max(...entries.map((entry) => entry.endMinutes));
      const timelineStart = Math.floor(earliest / 30) * 30;
      const timelineEnd = Math.ceil(latest / 30) * 30;
      const slotCount = Math.max(1, (timelineEnd - timelineStart) / 30);
      const timeLabels = Array.from({ length: slotCount + 1 }, (_, index) =>
        minutesToLabel(timelineStart + index * 30),
      );

      return `
        <section id="${section.id}" class="training-block">
          <div class="training-block-header">
            <div>
              <p class="eyebrow">${section.title}</p>
              <h3>${section.intro}</h3>
            </div>
          </div>
          <div class="schedule-board-wrapper">
            <div
              class="schedule-board"
              style="grid-template-rows: auto repeat(${slotCount}, minmax(44px, 44px));"
            >
              <div class="schedule-corner">Zeit</div>
              ${scheduleDayOrder
                .map(
                  (day, index) => `
                    <div class="schedule-day-header" style="grid-column: ${index + 2}; grid-row: 1;">
                      ${day}
                    </div>
                  `,
                )
                .join("")}
              ${timeLabels
                .slice(0, -1)
                .map(
                  (label, index) => `
                    <div class="schedule-time-label" style="grid-column: 1; grid-row: ${index + 2};">
                      ${label}
                    </div>
                  `,
                )
                .join("")}
              ${scheduleDayOrder
                .map((day, dayIndex) =>
                  Array.from({ length: slotCount }, (_, rowIndex) => `
                    <div
                      class="schedule-cell"
                      style="grid-column: ${dayIndex + 2}; grid-row: ${rowIndex + 2};"
                      aria-hidden="true"
                    ></div>
                  `).join(""),
                )
                .join("")}
              ${entries
                .map((entry) => {
                  const dayIndex = scheduleDayOrder.indexOf(entry.day);
                  const rowStart = (entry.startMinutes - timelineStart) / 30 + 2;
                  const rowEnd = (entry.endMinutes - timelineStart) / 30 + 2;

                  return `
                    <article
                      class="schedule-event schedule-event-${entry.id}"
                      style="grid-column: ${dayIndex + 2}; grid-row: ${rowStart} / ${rowEnd}; --event-color: ${entry.color}; --event-color-dark: ${entry.colorDark};"
                    >
                      <span class="schedule-event-badge">${entry.label}</span>
                      <h4>${entry.title}</h4>
                      <p class="schedule-event-time">${entry.startTime} - ${entry.endTime}</p>
                      <p class="schedule-event-location">${entry.location}</p>
                      <p class="schedule-event-coach">${entry.coach}</p>
                    </article>
                  `;
                })
                .join("")}
            </div>
          </div>
        </section>
      `;
    })
    .join("");
}

if (trainingGrid) {
  trainingGrid.innerHTML = trainingGroups
    .map(
      (group) => `
        <article class="training-card">
          <h3>${group.title}</h3>
          <p><strong>Coaching:</strong> ${group.coach}</p>
          <ul>
            ${group.slots.map((slot) => `<li>${slot}</li>`).join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

if (trainingGroupsContainer) {
  let activeTrainingFilter = "all";

  if (trainingFilterBar) {
    const filterOptions = [
      { id: "all", title: "Alle Gruppen" },
      ...trainingGroups.map((group) => ({ id: group.id, title: group.title, color: group.color })),
    ];

    trainingFilterBar.innerHTML = filterOptions
      .map(
        (option) => `
          <button
            class="training-filter-chip ${option.id === "all" ? "is-active" : ""}"
            type="button"
            data-training-filter="${option.id}"
            style="${option.color ? `--chip-color: ${option.color};` : ""}"
          >
            ${option.id === "all" ? "Alle" : option.title}
          </button>
        `,
      )
      .join("");

    trainingFilterBar.addEventListener("click", (event) => {
      const button = event.target.closest("[data-training-filter]");

      if (!button) {
        return;
      }

      activeTrainingFilter = button.dataset.trainingFilter || "all";

      trainingFilterBar.querySelectorAll(".training-filter-chip").forEach((chip) => {
        chip.classList.toggle("is-active", chip === button);
      });

      renderTrainingSchedule(trainingGroups, activeTrainingFilter);
    });
  }

  renderTrainingSchedule(trainingGroups, activeTrainingFilter);
}

if (newsList) {
  newsList.innerHTML = newsItems
    .map(
      (item) => `
        <article class="news-card">
          <time datetime="${item.date}">${item.date}</time>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `,
    )
    .join("");
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}