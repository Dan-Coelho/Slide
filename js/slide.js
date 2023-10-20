export default class Slide {
  constructor(slide, wrap) {
    this.slide = document.querySelector(slide);
    this.wrap = document.querySelector(wrap);
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
  }
  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }
  onStart(event) {
    let moveType;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.dist.startX = event.clientX;
      moveType = "mousemove";
    } else {
      moveType = "touchmove";
      this.dist.startX = event.changedTouches[0].clientX;
    }

    this.wrap.addEventListener(moveType, this.onMove);
  }
  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 2;
    return this.dist.finalPosition - this.dist.movement;
  }
  onMove(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }
  onEnd(event) {
    const moveType = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.wrap.removeEventListener(moveType, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }
  addSlideEvents() {
    this.wrap.addEventListener("mousedown", this.onStart);
    this.wrap.addEventListener("touchstart", this.onStart);
    this.wrap.addEventListener("mouseup", this.onEnd);
    this.wrap.addEventListener("touchend", this.onEnd);
  }
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  //slides config
  slidePosition(slide) {
    const margin = (this.wrap.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }
  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { position, element };
    });
  }
  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }
  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position);
    this.slidesIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
  }
  //iniciar
  init() {
    this.bindEvents();
    this.addSlideEvents();
    this.slidesConfig();
    return this;
  }
}
