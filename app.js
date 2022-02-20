import galleryItems from "./js/images.js";

////////////////////////////////////// ССЫЛКИ ///////////////////////////////////////////////////////////

const refs = {
  galleryList: document.querySelector(".js-gallery"),
  overlayDiv: document.querySelector(".js-lightbox"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
  image: document.querySelector(".lightbox__image"),
  btnClose: document.querySelector('[data-action="close-lightbox"]'),
};

const { galleryList, overlayDiv, lightboxOverlay, image, btnClose } = refs;

////////////////////////////////////// СОЗАНИЕ РАЗМЕТКИ ГАЛЛЕРЕИ ///////////////////////////////////////

const itemEl = ({ preview, original, description }) => {
  return `<li class="gallery__item">
            <a href="" class="gallery__link"> 
              <img class="gallery__image" src=${preview} alt=${description} data-source=${original} width="100%" heigth="100%">
            </a>
          </li>`;
};

const listEl = galleryItems.map(itemEl).join("");

galleryList.insertAdjacentHTML("beforeend", listEl);

////////////////////////////////////// ОТКРЫТИЕ МОДАЛКИ ////////////////////////////////////////////////

galleryList.addEventListener("click", onGalleryOpen);

function onGalleryOpen(event) {
  event.preventDefault();
  overlayDiv.classList.add("is-open");
  image.src = event.target.dataset.source;
  image.alt = event.target.dataset.alt;

  window.addEventListener("keydown", onEscBtnPress);
  window.addEventListener("keydown", arrowSlider);
}

////////////////////////////////////// ЗАКРЫТИЕ МОДАЛКИ ////////////////////////////////////////////////

btnClose.addEventListener("click", onGalleryClose);

function onGalleryClose() {
  overlayDiv.classList.remove("is-open");
  image.src = "";

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

lightboxOverlay.addEventListener("click", onGalleryMissClick);

function onGalleryMissClick() {
  if (lightboxOverlay) {
    onGalleryClose();
  }
}

////////////////////////////////////// СКРОЛЛ СТРЕЛКАМИ //////////////////////////////////////////////

function arrowSlider(event) {
  let nextIndex = 0;

  const currentIndex = galleryItems.indexOf(
    galleryItems.find((item) => item.description === image.alt)
  );

  if (event.key === "ArrowRight") {
    nextIndex = currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0;
  }
  if (event.key === "ArrowLeft") {
    nextIndex = currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1;
  }

  image.src = galleryItems[nextIndex].original;
  image.alt = galleryItems[nextIndex].description;
}
