import galleryItems from "./app.js";

////////////////////////////////////// ССЫЛКИ ///////////////////////////////////////////////////////////

const refs = {
  galleryList: document.querySelector(".js-gallery"),
  overlayDiv: document.querySelector(".js-lightbox"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
  image: document.querySelector(".lightbox__image"),
  btnClose: document.querySelector('[data-action="close-lightbox"]'),
};

////////////////////////////////////// СОЗАНИЕ РАЗМЕТКИ ГАЛЛЕРЕИ ///////////////////////////////////////

const itemEl = ({ preview, original, description }) => {
  return `<li class="gallery__item">
            <a href="" class="gallery__link"> 
              <img class="gallery__image" src=${preview} alt=${description} data-source=${original} width="100%" heigth="100%">
            </a>
          </li>`;
};

const listEl = galleryItems.map(itemEl).join("");

refs.galleryList.insertAdjacentHTML("beforeend", listEl);

////////////////////////////////////// ОТКРЫТИЕ МОДАЛКИ ////////////////////////////////////////////////

refs.galleryList.addEventListener("click", onGalleryOpen);

function onGalleryOpen(event) {
  event.preventDefault();
  refs.overlayDiv.classList.add("is-open");
  refs.image.src = event.target.dataset.source;
  refs.image.alt = event.target.dataset.alt;

  window.addEventListener("keydown", onEscBtnPress);
  window.addEventListener("keydown", arrowSlider);
}

////////////////////////////////////// ЗАКРЫТИЕ МОДАЛКИ ////////////////////////////////////////////////

refs.btnClose.addEventListener("click", onGalleryClose);

function onGalleryClose() {
  refs.overlayDiv.classList.remove("is-open");
  refs.image.src = "";

  window.removeEventListener("keydown", onEscBtnPress);
  window.removeEventListener("keydown", arrowSlider);
}

////////////////////////////////////// ЗАКРЫТИЕ ЭСКЕЙПОМ ///////////////////////////////////////////////

function onEscBtnPress(event) {
  const ESC = "Escape";
  if (event.code === ESC) {
    onGalleryClose();
  }
}

////////////////////////////////////// ЗАКРЫТИЕ МИСКЛИКОМ /////////////////////////////////////////////

refs.lightboxOverlay.addEventListener("click", onGalleryMissClick);

function onGalleryMissClick() {
  if (refs.lightboxOverlay) {
    onGalleryClose();
  }
}

////////////////////////////////////// СКРОЛЛ СТРЕЛКАМИ //////////////////////////////////////////////

function arrowSlider(event) {
  let nextIndex = 0;

  const currentIndex = galleryItems.indexOf(
    galleryItems.find((item) => item.description === refs.image.alt)
  );

  if (event.key === "ArrowRight") {
    nextIndex = currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0;
  }
  if (event.key === "ArrowLeft") {
    nextIndex = currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1;
  }

  refs.image.src = galleryItems[nextIndex].original;
  refs.image.alt = galleryItems[nextIndex].description;
}
