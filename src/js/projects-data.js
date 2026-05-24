// Projects Data
Alpine.data("projectsData", () => ({
  activeProject: null,
  currentIndex: 0,
  activeMobileDot: 0,
  projects: [
    {
      coverWebm: "/images/nhc-port-cover.webm",
      title: "Nova Health Collective",
      category: "Branding + Web Design",
      description: `Mason came to [us] ready to level up her brand and expand her offerings from midwifery to include psychedelic facilitation. She needed a brand that felt aligned with her vision so we left behind a partner-chosen logo and created something entirely new. The result: a grounded, modern and strategic brand identity and a custom 5-page website with a client portal for resources and an events page to support her growing practice. Now, Mason’s online presence feels as expansive and intentional as her work.`,
      quote: `"I really like [the logo]! I love it, this looks really wonderful and I don't have any revisions to the website to request."`,
      before: "",
      after: "/images/nhc-after.webp",
      coverAlt: "Nova Health Collective website redesign",
      beforeAlt: "",
      afterAlt:
        "Modern and strategic brand identity and custom website for a midwifery and psychedelic facilitation practice",
    },
    {
      coverWebm: "/images/kvs-port-cover.webm",
      title: "Kay's Virtual Solutions",
      category: "Website Design",
      description: `Kayla came to us knowing her old website just wasn’t cutting it. She wanted something that actually reflected her vibe of being polished, feminine and ready to attract her dream clients. Using her existing logo, colors, and fonts, we built a site that felt like her and resonated with the people she wanted to work with.

                As her business evolved into business efficiency consulting, we updated her site with the same brand but with fresh brand photos and a custom AI-scripted chatbot.`,
      quote: `"I always fall in love with Cassandra's designs.She consistently delivers on professionalism and impact.Seriously, I'm always impressed with Cassandra and her design abilities. She's my go to girl for web design"`,
      before: "/images/kvs-before.webp",
      after: "/images/kvs-after.webp",
      coverAlt: "Kay's Virtual Solutions website redesign",
      beforeAlt: "Kay's Virtual Solutions original website",
      afterAlt:
        "Polished and feminine website redesign for a fractional COO business consulting firm",
    },
    {
      coverWebm: "/images/luxe-port-cover.webm",
      title: "Luxe Pet Parlor",
      category: "Branding + Web Design",
      description:
        "Cheyanne came to us needing a rebrand from loud and disheveled to calming and luxurious. Inspired by her Cajun roots and spa-like vision, we created a soothing visual identity using pastel greens, soft purples, and natural wood tones.",
      quote:
        '"The thing I liked most about working with Cass was how easy she made everything."',
      before: "",
      after: "/images/luxe-after.webp",
      coverAlt: "Luxe Pet Parlor brand and website design",
      beforeAlt: "",
      afterAlt:
        "Calming and luxurious brand identity and website for a pet grooming business",
    },
    {
      coverWebm: "/images/colliance-port-cover.webm",
      title: "Colliance Online Business Management",
      category: "Website Redesign",
      description: `After their original designer ghosted them, Sandy needed someone to step in and bring her vision to life. Using the existing branding, we rebuilt her website to feel brighter, more inviting, and easy to navigate. I expanded the site to include individual service pages, team intros, and tiered offerings specific to different business stages. We also designed two strategic sales funnels for their project management and bookkeeping services. The result is a warm, well-structured site that truly reflects their professionalism and builds trust with potential clients.`,
      quote: `"[Flying Mouse Labs] is always on top of any task we give [them] and does incredible design work."`,
      before: "/images/colliance-before.webp",
      after: "/images/colliance-after.webp",
      coverAlt: "Colliance Online Business Management website redesign",
      beforeAlt: "",
      afterAlt:
        "Brighter, more inviting, and easy to navigate website redesign for a business management consulting firm",
    },
    {
      coverWebm: "/images/das-port-cover.webm",
      title: "Damaris Accounting",
      category: "Web Design",
      description: `Damaris, an accountant offering bookkeeping, tax prep, business formation, and accounting services, needed a site that matched the quality of her work. Her original site fell short, so we rebuilt it on Squarespace using her existing logo and elevated the branding to feel modern, professional, and luxurious. The new single-page site clearly presents her services, with on-page SEO and Google tools in place to support future growth. Damaris said I brought her vision to life and that she didn’t know her site could look this good.`,
      quote: `"I had a website that was done for free, but it wasn’t finished, and it definitely didn’t reflect the quality of my business. I knew I needed something more professional, but I wasn’t sure who to trust with the redesign. I was concerned about finding someone who could understand my business and make the process feel manageable.

                [Flying Mouse Labs] made it incredibly easy. From strategy to Google Business Profile to the design itself, she brought everything together beautifully. My new website is even better than I imagined it could be!"`,
      before: "",
      after: "/images/das-after.webp",
      coverAlt: "Damaris Accounting website redesign",
      beforeAlt: "",
      afterAlt: "Professional website redesign for an accounting firm",
    },
    {
      coverWebm: "/images/gg-port-cover.webm",
      title: "Grateful Graze",
      category: "Branding + Web Design",
      description: `Ericka\'s business was in between the stage of start up and brick and mortar. One of her problems was that her current website that could not take online orders, folks could only call in their order. This we found was a fundamental point in her journey. After implementing an online orderer to her site, she\'s since opened a store front as the first charcuterie and cheese grazing cafe in WIlington. NC.`,
      quote: `"We have worked together remotely and to say it’s been a breeze during the whole website design would be an understatement! Cassandra is so great to work with, she created exactly what I had envisioned and I couldn’t be happier with how the new website turned out.

                If you need any design or website development done for your business please reach out to Cassandra, you won’t be disappointed!"`,
      before: "",
      after: "/images/gg-after.webp",
      coverAlt: "Grateful Graze website redesign",
      beforeAlt: "",
      afterAlt:
        "Eclectic website redesign for a charcuterie and cheese grazing cafe",
    },
  ],
  get mobileProjects() {
    return [...this.projects, ...this.projects];
  },
  handleInfiniteScroll() {
    const el = this.$refs.mobileScroll;
    const halfway = el.scrollWidth / 2;
    if (el.scrollLeft >= halfway) {
      el.scrollLeft -= halfway;
    }
    if (el.scrollLeft <= 0) {
      el.scrollLeft += halfway;
    }
    const cardWidth = el.scrollWidth / (this.projects.length * 2);
    this.activeMobileDot =
      Math.round(el.scrollLeft / cardWidth) % this.projects.length;
  },
  openProject(index) {
    this.currentIndex = index;
    this.activeProject = this.projects[index];
    document.body.style.overflow = "hidden";
    // Tell the rest of the page a project is open
    window.dispatchEvent(
      new CustomEvent("modal-state", { detail: { open: true } }),
    );
  },

  closeProject() {
    this.activeProject = null;
    document.body.style.overflow = "auto";
    // Tell the rest of the page the project is closed
    window.dispatchEvent(
      new CustomEvent("modal-state", { detail: { open: false } }),
    );
  },
  prev() {
    this.currentIndex =
      this.currentIndex > 0 ? this.currentIndex - 1 : this.projects.length - 1;
    this.activeProject = this.projects[this.currentIndex];
  },
  next() {
    this.currentIndex =
      this.currentIndex < this.projects.length - 1 ? this.currentIndex + 1 : 0;
    this.activeProject = this.projects[this.currentIndex];
  },
}));
