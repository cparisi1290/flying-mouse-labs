import Alpine from "alpinejs";
import collapse from "@alpinejs/collapse";

window.Alpine = Alpine;
Alpine.plugin(collapse);

async function init() {
  await import("./projects-data.js");
  await import("./testimonials-data.js");
  await import("./blog-data.js");
  Alpine.start();
}

init();
