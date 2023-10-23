import Slide from "./slide.js";

const slide = new Slide(".slide", ".wrap");
slide.init();
console.log(slide);

slide.changeSlide(0);
