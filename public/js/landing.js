// Basic With Easing
gsap.from(".about-text", { duration: 3, y: -150, opacity: 0, ease: "back.out(2)" });
gsap.from(".about-image", { duration: 3, x: -150, opacity: 0, ease: "sine.inOut(2)" });

// Basic With Delay
gsap.from(".card-1", { duration: 1.5, delay: 1.1, y: 50, opacity: 0 });
gsap.from(".card-2", { duration: 1.5, delay: 1.3, y: 50, opacity: 0 });
gsap.from(".card-3", { duration: 1.5, delay: 1.5, y: 50, opacity: 0 });


// Basic With Timeline 1
var timeline = gsap.timeline({
  // Add Some Default Option Here
});

timeline
  .from(".hero-text__main", { x: -150, duration: 1.5, opacity: 0 })
  .from(".hero-text__subs", { y: -100, duration: 1.2, opacity: 0 })
  .from(".hero-text__btn", { y: -100, duration: 1, opacity: 0 })
  .from(".hero-image__main", { x: 100, duration: 1, opacity: 0 });

timeline
  .from(".contact-image", { duration: 1, y: 100, opacity: 0 })
  .from(".contact-title", { duration: 1, y: -50, opacity: 0 })
  .from(".group-1", { duration: 0.5, y: -50, opacity: 0 })
  .from(".group-2", { duration: 0.6, y: -50, opacity: 0 })
  .from(".group-3", { duration: 0.7, y: -50, opacity: 0 })
  .from(".group-4", { duration: 0.8, y: -50, opacity: 0 });