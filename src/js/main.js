async function init() {
  await import("./services-data.js");
  await import("./projects-data.js");
  await import("./testimonials-data.js");
  await import("./blog-data.js");
}

init();
