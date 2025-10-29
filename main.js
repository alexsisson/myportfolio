const projects = [
  {
    id: "recipe-finder",
    title: "Recipe Finder App",
    image: "images/Recipe.png",
    description:
      "Search ingredients and get instant recipe ideas. Built with semantic HTML, modular JS, and async API calls.",
    tech: ["HTML", "CSS", "JavaScript"],
    status: "Completed"
  },
  {
    id: "eco-travel",
    title: "Eco Travel Blog",
    image: "images/Eco.png",
    description:
      "A sustainable travel starter theme with scroll animations and markdown-friendly posts.",
    tech: ["HTML", "SASS", "JS"],
    status: "In Progress"
  },
  {
    id: "portfolio-2",
    title: "portfolio-2",
    image: "images/Protafilio.png",
    description:
      "Modernized portfolio with dark mode, skip-links, and Lighthouse 98/100.",
    tech: ["HTML", "CSS", "JavaScript"],
    status: "Completed"
  },
  {
    id: "musicmood",
    title: "MusicMood Web Player",
    image: "images/music.png",
    description:
      "A mood-based playlist recommender with client-side caching and offline fallback.",
    tech: ["HTML", "CSS", "JavaScript"],
    status: "In Progress"
  },
  {
    id: "shop-lite",
    title: "ShopLite Landing",
    image: "images/shoplite.png",
    description:
      "High-converting landing page with A/B tested hero copy and accessible form flows.",
    tech: ["HTML", "CSS"],
    status: "Completed"
  },
  {
    id: "task-tide",
    title: "TaskTide Kanban",
    image: "images/task.png",
    description:
      "Drag-and-drop tasks with localStorage persistence and keyboard reordering.",
    tech: ["HTML", "CSS", "JavaScript"],
    status: "Completed"
  }
];

const $ = (sel, root=document) => root.querySelector(sel);

function statusPill(status){
  const cls = status === "Completed" ? "status-done" : "status-progress";
  return `<span class="status-pill ${cls}">${status}</span>`;
}

(function mountFeatured(){
  const gallery = document.getElementById("project-gallery");
  if(!gallery) return;

  projects.slice(0,4).forEach(p=>{
    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" data-title="${p.title}" data-status="${p.status}">
      <div class="card-body">
        <h3>${p.title} ${statusPill(p.status)}</h3>
        <p>${p.description}</p>
        <p><strong>Tech:</strong> ${p.tech.join(", ")}</p>
      </div>`;
    gallery.appendChild(card);
  });
})();

(function mountAllProjects(){
  const list = document.getElementById("all-projects");
  if(!list) return; 

  const techFilter = document.getElementById("techFilter");
  const statusFilter = document.getElementById("statusFilter");
  const searchInput = document.getElementById("searchInput");

  const techs = [...new Set(projects.flatMap(p => p.tech))].sort();
  techs.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    techFilter.appendChild(opt);
  });

  function render(items) {
    list.innerHTML = "";
    items.forEach(p => {
      const el = document.createElement("article");
      el.className = "project-card fade-in";
      el.innerHTML = `
        <img src="${p.image}" alt="${p.title}" data-title="${p.title}" data-status="${p.status}">
        <div class="card-body">
          <h3>${p.title} ${statusPill(p.status)}</h3>
          <p>${p.description}</p>
          <p><strong>Tech:</strong> ${p.tech.join(", ")}</p>
        </div>`;
      list.appendChild(el);
    });
    if (items.length === 0) {
      list.innerHTML = `<p>No projects match your filters.</p>`;
    }
  }

  function applyFilters() {
    const t = techFilter.value;
    const s = statusFilter.value;
    const q = searchInput.value.trim().toLowerCase();

    const filtered = projects.filter(p => {
      const byTech = t === "all" || p.tech.includes(t);
      const byStatus = s === "all" || p.status === s;
      const bySearch = !q || p.title.toLowerCase().includes(q);
      return byTech && byStatus && bySearch;
    });

    render(filtered);
  }

  [techFilter, statusFilter, searchInput].forEach(el =>
    el.addEventListener("input", applyFilters)
  );

  render(projects);
})();

(function contactForm(){
  const form = document.getElementById("contactForm");
  if(!form) return;
  const out = document.getElementById("formMessage");

  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const msg = $("#message").value.trim();

    if(!name || !email || !msg){
      out.textContent = "Please complete all fields.";
      out.style.color = "#a42212";
      return;
    }

    const validEmail = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
    if(!validEmail){
      out.textContent = "Please enter a valid email address.";
      out.style.color = "#a42212";
      return;
    }

    out.textContent = "Thanks! Your message has been sent.";
    out.style.color = "#185a2b";
    form.reset();
  });
})();

const viewer = document.querySelector('.viewer');
const viewerImage = viewer.querySelector('img');
const viewerCaption = document.querySelector('.viewer-caption');
const closeButton = document.querySelector('.close-viewer');

setTimeout(() => {
  const images = document.querySelectorAll('.card img, .project-card img');
  images.forEach(img => {
    if (!img.classList.contains('profile-pic')) {
      img.addEventListener('click', () => {
        viewerImage.src = img.src;
        viewerCaption.textContent = img.dataset.title
          ? `${img.dataset.title} — ${img.dataset.status || ''}`
          : img.alt;
        viewer.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      });
    }
  });
}, 500);

closeButton.addEventListener('click', () => {
  viewer.classList.add('hidden');
  viewerImage.src = '';
  viewerCaption.textContent = '';
  document.body.style.overflow = '';
});

viewer.addEventListener('click', (e) => {
  if (e.target === viewer) {
    viewer.classList.add('hidden');
    viewerImage.src = '';
    viewerCaption.textContent = '';
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !viewer.classList.contains('hidden')) {
    viewer.classList.add('hidden');
    viewerImage.src = '';
    viewerCaption.textContent = '';
    document.body.style.overflow = '';
  }
});
