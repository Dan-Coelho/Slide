import { Slide, SlideNav } from "./slide.js";

const slide = new SlideNav(".slide", ".wrap");
slide.init();
slide.addArrow(".prev", ".next");
console.log(slide);
