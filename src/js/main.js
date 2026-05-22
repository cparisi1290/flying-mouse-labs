import Alpine from "alpinejs";
import collapse from "@alpinejs/collapse";

Alpine.plugin(collapse);
window.Alpine = Alpine;

// Import data files so they register before Alpine starts
import "./projects-data.js";
import "./testimonials-data.js";
import "./blog-data.js";

Alpine.start();
