document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    const offset = 80; // navbar height
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

// Counter Animation
const counters = document.querySelectorAll('.stat-number');
let statsPlayed = false;

const runCounters = () => {
  if (statsPlayed) return;
  statsPlayed = true;

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const speed = 240; //defalt:80

    const updateCount = () => {
      const increment = Math.ceil(target / speed);
      count += increment;

      if (count < target) {
        counter.innerText = count;
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
};

const statsSection = document.querySelector('#stats');

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    runCounters();
    observer.disconnect();
  }
}, { threshold: 0.4 });

observer.observe(statsSection);