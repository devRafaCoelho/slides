import Slide from "./slide.js";

const slide = new Slide(".slide", ".slide-wrapper");
slide.init();

slide.handleChangeSlide(3);
// slide.handleActiveNextSlide();
// slide.handleActivePrevSlide();
