document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("carousel");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const stopBtn = document.querySelector(".stop-btn");
  const liveRegion = document.getElementById("live-region");
  let currentIndex = 0;
  let intervalId = null;

  function showItem(index) {
    const items = carousel.querySelectorAll(".carousel-item");
    items.forEach((item, i) => {
      const shouldShow = i === index;
      item.setAttribute("aria-hidden", !shouldShow);
      if (shouldShow) {
        item.focus(); // Define o foco no elemento da notícia atual
      }
    });
    announceNews(index);
  }

  function navigateCarousel(direction) {
    currentIndex = (currentIndex + direction + carousel.children.length) % carousel.children.length;
    showItem(currentIndex);
  }

  function startCarousel() {
    intervalId = setInterval(() => navigateCarousel(1), 30000);
  }

  function stopCarousel() {
    clearInterval(intervalId);
  }

  function announceNews(index) {
    const currentItem = carousel.querySelector(`.carousel-item:nth-child(${index + 1})`);
    const title = currentItem.querySelector('h2').innerText;
    const content = currentItem.querySelector('p').innerText;
    const announcement = `Nova Notícia: ${title}. ${content}`;
    liveRegion.innerText = announcement;
  }

  showItem(currentIndex);
  startCarousel();

  prevBtn.addEventListener("click", () => { stopCarousel(); navigateCarousel(-1); });
  nextBtn.addEventListener("click", () => { stopCarousel(); navigateCarousel(1); });
  stopBtn.addEventListener("click", stopCarousel);

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      stopCarousel();
      navigateCarousel(-1);
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      stopCarousel();
      navigateCarousel(1);
    }
  });
});
