const bottles = document.querySelectorAll(".bottle");
const resultTexts = document.querySelectorAll(".text-miracle .r");
const questionContainer = document.querySelector(".question");
const modal = document.querySelector(".modal");
const modal_img = document.querySelector(".over");
const shownImages = new Set();
const swiperCont = document.querySelector(".swipe-container");
const slide = document.querySelectorAll(".slider");
const swiperContText = document.querySelector(".text-container");
const slideText = document.querySelectorAll(".text-slider");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
const glavno = document.querySelector(".glavno");
const container = document.querySelector(".container");

const imageFiles = [
  "logo.png",
  "banner.png",
  "BG (1).png",
  "BG (2).png",
  "3.png",
  "first.png",
  "MIRACLE CURLS CN 12.1oz.png",
  "MIRACLE VOLUME CN 12.1oz.png",
  "MIRACLE WAVES CN 12.1oz.png",
  "TOTAL MIRACLE CN 12.1oz.png",
  "Total Miracle-Trans.png",
  "Total Miracle.png",
  "Miracle Volume.png",
  "Miracle Volume-Tran.png",
  "Miracle Waves.png",
  "Miracle Waves-Trans.png",
  "Miracle Curls.png",
  "Miracle Curls-Trans.png",
  "Product1.png",
  "Product2.png",
  "Product3.png",
  "Product4.png",
  "Product5.png",
  "Product6.png",
  "Product7.png",
  "Product8.png",
];

imageFiles.forEach((file) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = `assets/${file}`;
  link.type = "image/png";
  document.head.appendChild(link);
});

const textMiracle = [
  {
    text: "Which one gives you deep moisturization for coarse hair?",
    choose: "total",
  },
  { text: "Which one helps you moisturize and define curls?", choose: "curls" },
  { text: "Which one gives you frizz-free wave definition?", choose: "waves" },
  { text: "Which one adds body and lift?", choose: "volume" },
];

const arrayTrans = [
  { image: "Miracle Curls-Trans.png", choose: "curls" },
  { image: "Miracle Volume-Tran.png", choose: "volume" },
  { image: "Miracle Waves-Trans.png", choose: "waves" },
  { image: "Total Miracle-Trans.png", choose: "total" },
];

let currentQuestionIndex = 0;

function showNextQuestion() {
  if (currentQuestionIndex >= textMiracle.length) {
    questionContainer.textContent = "🎉 Game Over! Well done!";
    questionContainer.classList.remove("hidden");
    return;
  }

  const q = textMiracle[currentQuestionIndex];
  questionContainer.textContent = q.text;
  questionContainer.classList.remove("hidden");

  resultTexts.forEach((el) => el.classList.add("hidden"));
}

bottles.forEach((bottle) => {
  bottle.addEventListener("click", () => {
    const choose = bottle.getAttribute("choose");

    const currentVisible = [...document.querySelectorAll(".image")].find(
      (el) => !el.classList.contains("hidden")
    );
    const currentChoose = currentVisible?.getAttribute("image-choose");

    if (currentChoose !== choose) {
      console.log(`Нельзя выбрать ${choose}, пока показана ${currentChoose}`);
      return;
    }

    const correctAnswer = textMiracle[currentQuestionIndex]?.choose;

    const result = document.querySelector(
      `.text-miracle [text-miracle="${choose}"]`
    );
    if (result) {
      result.classList.remove("hidden");
    }

    questionContainer.classList.add("hidden");

    const imgEl = currentVisible.querySelector("img");
    const originalSrc = imgEl.src;
    const transItem = arrayTrans.find((item) => item.choose === choose);
    if (!transItem) return;

    imgEl.src = `assets/${transItem.image}`;

    setTimeout(() => {
      const available = [...document.querySelectorAll(".image")].filter(
        (el) => {
          const ch = el.getAttribute("image-choose");
          return ch !== choose && !shownImages.has(ch);
        }
      );

      if (available.length === 0) {
        console.log("✅ Последняя транс-картинка остаётся");
        setTimeout(() => {
          glavno.classList.add("hidden");
          container.classList.remove("hidden");
        }, 3000);

        shownImages.add(choose);
        currentQuestionIndex++;
        return;
      }

      imgEl.src = originalSrc;
      currentVisible.classList.add("hidden");

      const randomBlock =
        available[Math.floor(Math.random() * available.length)];
      randomBlock.classList.remove("hidden");

      shownImages.add(choose);
      currentQuestionIndex++;
      showNextQuestion();

      document.querySelectorAll(".img-border").forEach((img) => {
        img.classList.remove("active");
      });
    }, 3000);
    document.querySelectorAll(".img-border").forEach((img) => {
      img.classList.remove("active");
    });

    const innerImg = bottle.querySelector("img");
    if (innerImg) {
      innerImg.classList.add("active");
    }
  });
});

function PlayNow() { 
  modal.style.zIndex = "-10000" 
  showNextQuestion();
}

let current = 0;

function goToSlide(newIndex, direction) {
  if (newIndex === current) return;

  const currentSlide = slide[current];
  const nextSlide = slide[newIndex];
  const currentSlideText = slideText[current];
  const nextSlideText = slideText[newIndex];

  currentSlide.classList.remove("active");
  nextSlide.classList.remove("to-left", "to-right", "active");
  currentSlideText.classList.remove("active");
  nextSlideText.classList.remove("to-left", "to-right", "active");

  if (direction === "next") {
    currentSlide.classList.add("to-left");
    nextSlide.classList.add("to-right");
    currentSlideText.classList.add("to-left");
    nextSlideText.classList.add("to-right");
  } else {
    currentSlide.classList.add("to-right");
    nextSlide.classList.add("to-left");
    currentSlideText.classList.add("to-right");
    nextSlideText.classList.add("to-left");
  }

  setTimeout(() => {
    currentSlide.classList.remove("to-left", "to-right");
    nextSlide.classList.remove("to-left", "to-right");
    currentSlideText.classList.remove("to-left", "to-right");
    nextSlideText.classList.remove("to-left", "to-right");
    nextSlide.classList.add("active");
    nextSlideText.classList.add("active");
    current = newIndex;
  }, 50);
}

nextButton.addEventListener("click", () => {
  const nextIndex = (current + 1) % slide.length;
  goToSlide(nextIndex, "next");
});

prevButton.addEventListener("click", () => {
  const prevIndex = (current - 1 + slide.length) % slide.length;
  goToSlide(prevIndex, "prev");
});
