export default class Slide {
  constructor(slide, wrap) {
    this.slide = document.querySelector(slide);
    this.wrap = document.querySelector(wrap);
  }
  onStart(event) {
    event.preventDefault();
    this.wrap.addEventListener("mousemove", this.onMove);
    console.log("mousedown");
  }
  onMove(event) {
    console.log("moveu");
  }
  onEnd(event) {
    console.log("acabou");
    this.wrap.removeEventListener("mousemove", this.onMove);
  }
  addSlideEvents() {
    this.wrap.addEventListener("mousedown", this.onStart);
    this.wrap.addEventListener("mouseup", this.onEnd);
  }
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }
  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}
