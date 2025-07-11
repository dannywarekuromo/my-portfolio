import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  const lenis = new Lenis({
    autoRaf: true,
  })

  /////////// preloader sequence
  const preloaderScreen = document.querySelector('#preloader');

  document.body.style.overflow = "hidden";
  document.body.style.backgroundColor = "#050505";

  let preloaderTl = gsap.timeline();

  preloaderTl.from('.preloader-img', {
    scale: 0.5,
    duration: 1,
    stagger: 0.5,
    onComplete: preloaderEnd,
  })

  function preloaderEnd() {
    preloaderScreen.classList.add('hide-page');

    document.body.style.overflow = "visible";
    document.body.style.backgroundColor = "#e3dcdc";

    ////// hero sequence
    let heroTl = gsap.timeline({ delay: 1 });

    heroTl.from('#hero-title', {
      // opacity: 0,
      yPercent: 150,
      duration: 0.5
    })
      .from('.header-item', {
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%',
      })
      .from('#hero-image', {
        opacity: 0,
        duration: 1,
        scale: 0.5,
      }, '0.1')
      .from('.value-prop', {
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%',
      })
      .from('.address-prop', {
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%',
      })
      .from('.hero-svg-branch', {
        opacity: 0,
      }, '<')
      .from('#indicator-text', {
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%',
      }, '<')
  }

  //////////// mouse tracker
  const mouseTracker = document.querySelector('#mouse-tracker');

  // Current and target positions
  let pos = { x: 0, y: 0 };
  let target = { x: pos.x, y: pos.y };

  // Lerp function
  const lerp = (start, end, amt) => start + (end - start) * amt;

  // Update target on mouse move
  window.addEventListener('mousemove', (e) => {
    mouseTracker.style.opacity = "1"
    target.x = e.clientX;
    target.y = e.clientY;
  });

  function animateCursor() {
    pos.x = lerp(pos.x, target.x, 0.05);
    pos.y = lerp(pos.y, target.y, 0.05);

    mouseTracker.style.transform = `translate(${pos.x}px, ${pos.y}px)`; // offset for center

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  /////////// hide navbar on scroll 
  const navBar = document.querySelector('#nav');
  let lastScrollY = window.scrollY;

  const navBarAnim = gsap.fromTo(navBar, {
    yPercent: -100,
  }, {
    yPercent: 0,
    duration: 0.3,
    delay: 0.1
  })

  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
      // scroll down
      navBarAnim.reverse();
    } else {
      navBarAnim.play();
    }

    lastScrollY = 200;
  })

  /////// highlight emote
  const markedTexts = gsap.utils.toArray('.highlight');
  const markedTexts2 = gsap.utils.toArray('.highlight-2');

  markedTexts.forEach(text => {
    gsap.from(text, {
      scrollTrigger: {
        trigger: text,
        scrub: true,
        start: '50% 85%',
        end: '50% 50%',
        stagger: 0.5,
      },
      backgroundSize: '0% 100%',
    })
  })

  /////// services sequence
  const servicesTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.services',
      start: 'top 80%',
      stagger: 0.5,
      // end: '50% 50%',
    }
  });

  servicesTl.from('.service-copy', {
    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%',
  })
    .from('.service-line', {
      width: 0,
    }).from('.service-heading', {
      opacity: 0,
    }, '<').from('.service-specs-text', {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%',
    }, '<')

  /////// services emote
  const serviceCards = gsap.utils.toArray('.service-card');

  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('active');
    })
    card.addEventListener('mouseleave', () => {
      card.classList.remove('active');
    })
  })

  ////// work sequence
  const mottoTexts = gsap.utils.toArray('.motto-copy');

  mottoTexts.forEach(text => {
    gsap.from(text, {
      scrollTrigger: {
        trigger: text,
        start: 'top 80%',
      },
      opacity: 0,
      duration: 0.5,
    })
  })

  const slideTexts = gsap.utils.toArray('.motto-slide');

  slideTexts.forEach(slideText => {
    gsap.from(slideText, {
      scrollTrigger: {
        trigger: slideText,
        start: 'top 80%',
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
    })
  })

  //////// svg sequence
  const svgMainTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#svg-container',
      start: 'top top',
      pin: true,
    }
  })

  svgMainTl.from('#grid-lines', {
    opacity: 0
  }).from('#vessel-outline', {
    opacity: 0,
  }).from('#criss', {
    opacity: 0,
  }, '<').from('#cross', {
    opacity: 0,
  }, '<').from('#vessel', {
    strokeDasharray: 1980,
  }).from('#vesper', {
    opacity: 0,
    onComplete: () => {
      gsap.to('#grid-lines', {
        opacity: 0,
      })
      gsap.to('#vessel-outline', {
        opacity: 0,
        delay: 0.5,
      })
      document.querySelector('#vessel').classList.add('sway');
    }
  })

  /////// experience sequence
  const experienceTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#experience-intro',
      start: 'top 80%',
      stagger: 0.5,
    }
  })

  experienceTl.from('.experience-copy', {
    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%',
  }).from('.experience-line', {
    width: 0,
  }).from('.period', {
    opacity: 0,
  }, '<').from('.experience-heading', {
    opacity: 0,
  }, '<').from('.experience-specs-text', {
    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%',
  }, '<')


  ////////// marked text 2
  markedTexts2.forEach(text => {
    gsap.from(text, {
      scrollTrigger: {
        trigger: text,
        scrub: true,
        start: '50% 85%',
        end: '50% 50%',
        stagger: 0.5,
      },
      backgroundSize: '0% 100%',
      color: '#e3dcdc',
    })
  })

  ////// testimonial sequence
  const testimonialTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.testimonial',
      start: 'top 80%',
    }
  })

  testimonialTl.from('.testimonial-svg > svg', {
    opacity: 0,
  }).from('.testiphant-text', {
    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%',
    stagger: 0.5,
  })

  ////////// contact sequence
  gsap.from('#contact-cta a', {
    scrollTrigger: {
      trigger: '#contact-cta a',
      start: 'top 80%',
    },
    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%',
  })

  /////////// footer sequence 


  gsap.from('.footer-text', {
    scrollTrigger: {
      trigger: '.footer-text',
      start: 'top 80%',
    },
    opacity: 0,
  })
  gsap.from('.footer-link', {
    scrollTrigger: {
      trigger: '.footer-link',
      start: 'top 80%',
    },
    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%',
  })
})