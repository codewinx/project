function animateCountUp() {
    const counters = document.querySelectorAll('.animate-count-up');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      let count = 0;
      const increment = target / 200;
      const updateCount = () => {
        if (count < target) {
          count += increment;
          counter.innerText = Math.round(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  }

  document.addEventListener('DOMContentLoaded', animateCountUp);
