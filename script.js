const trainingGroups = [
  {
    title: "Kidssports U4",
    coach: "Gregory Redavid, Christophe Kremer, Marc Jungels, Max Blanc",
    slots: [
      "Mittwoch, 16:30-17:30, Omnisports, 21 rue des Pres, Mersch",
      "Samstag, 10:00-11:00, SportHall, 4 rue de l'Ecole, Lintgen",
    ],
  },
  {
    title: "U7",
    coach: "Max Blanc, Anne Holm",
    slots: [
      "Dienstag, 17:30-18:30, Sportshal Lintgen, 50 rue de la Gare",
      "Freitag, 16:30-17:30, Hall Omnisports Krounebierg, 11 rue de la Piscine, Mersch",
    ],
  },
  {
    title: "U9",
    coach: "Max Blanc, Louis Van der Weken",
    slots: [
      "Dienstag, 17:30-19:00, Hall Omnisports Krounebierg, 11 rue de la Piscine, Mersch",
      "Donnerstag, 17:30-19:00, Hall Omnisports Krounebierg, 11 rue de la Piscine, Mersch",
    ],
  },
  {
    title: "U11",
    coach: "Max Blanc, Elie Schuster",
    slots: [
      "Mittwoch, 17:30-19:00, Hall Omnisports, 21 rue des Pres, Mersch",
      "Freitag, 17:30-19:00, Hall Omnisports Krounebierg, 11 rue de la Piscine, Mersch",
    ],
  },
  {
    title: "U13 und U15",
    coach: "Max Blanc, Mathis Derneden",
    slots: [
      "Montag, 17:30-19:00, Hall Omnisports, 21 rue des Pres, Mersch",
      "Mittwoch, 18:30-20:00, Hall Omnisports, 21 rue des Pres, Mersch",
      "Freitag, 19:00-20:30, Hall Omnisports Krounebierg, 11 rue de la Piscine, Mersch",
    ],
  },
  {
    title: "Girls Group U9 bis U13",
    coach: "Anne Bisenius Holm, Katarzyna Pietrasik",
    slots: ["Freitag, 17:30-19:00, Hall Omnisports, 21 rue des Pres, Mersch"],
  },
  {
    title: "Frauen",
    coach: "Katarzyna Pietrasik",
    slots: [
      "Montag, 19:00-20:30, Hall Omnisports, 21 rue des Pres, Mersch",
      "Freitag, 19:00-20:30, Hall Omnisports, 21 rue des Pres, Mersch",
    ],
  },
  {
    title: "Herren S1, S2, U21 und U17",
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
    title: "Website-Relaunch auf GitHub Pages gestartet",
    text: "Die neue Präsenz wird modular aufgebaut, damit Inhalte leichter gepflegt und später ohne WordPress erweitert werden können.",
  },
  {
    date: "Nächster Schritt",
    title: "News, Galerie und Sponsoren separat aufbauen",
    text: "Die Grundstruktur steht bewusst schlank. Redaktionelle Bereiche lassen sich jetzt gezielt als eigene Seiten oder Datenquellen ergänzen.",
  },
  {
    date: "Clubleben",
    title: "Join-Us-Bereich für Nachwuchs und Ehrenamt",
    text: "Ein klarer Einstieg für neue Spielerinnen, Spieler, Familien, Helfer und Partner ersetzt verschachtelte Inhalte der alten Seite.",
  },
];

const trainingGrid = document.querySelector("#training-grid");
const newsList = document.querySelector("#news-list");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const year = document.querySelector("#year");

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