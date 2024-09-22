export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);

    this.handleStart = this.handleStart.bind(this);
    this.handleEndEvent = this.handleEndEvent.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  handleStart(event) {
    event.preventDefault();
    console.log("started");
    this.wrapper.addEventListener("mousedown", this.handleMove);
  }

  handleMove(event) {
    console.log("moved");
  }

  handleEndEvent() {
    console.log("finished");
    this.wrapper.removeEventListener("mousedown", this.handleMove);
  }

  addEvents() {
    this.wrapper.addEventListener("mousedown", this.handleStart);
    this.wrapper.addEventListener("mouseup", this.handleEndEvent);
  }

  init() {
    this.addEvents();
    return this;
  }
}
