import { SlideNav } from "./slide.js";

const slide = new SlideNav(".slide", ".slide-wrapper");
slide.init();
slide.handleAddArrow(".prev", ".next");
slide.handleAddEventControl(".custom-control");
