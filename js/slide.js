export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.distance = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleEndEvent = this.handleEndEvent.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  handleMoveSlide(distanceX) {
    this.distance.movePosition = distanceX;
    this.slide.style.transform = `translate3d(${distanceX}px, 0, 0)`;
  }

  handleUpdatePosition(clientX) {
    this.distance.movement = this.distance.startX - clientX;
    return this.distance.finalPosition - this.distance.movement;
  }

  handleStart(event) {
    let moveType;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.distance.startX = event.clientX;
      moveType = "mousemove";
    } else {
      this.distance.startX = event.changedTouches[0].clientX;
      moveType = "touchmove";
    }
    this.wrapper.addEventListener(moveType, this.handleMove);
  }

  handleMove(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;

    const updatedPosition = this.handleUpdatePosition(pointerPosition);
    this.handleMoveSlide(updatedPosition);
  }

  handleEndEvent(event) {
    const moveType = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.wrapper.removeEventListener(moveType, this.handleMove);
    this.distance.finalPosition = this.distance.movePosition;
  }

  addEvents() {
    this.wrapper.addEventListener("mousedown", this.handleStart);
    this.wrapper.addEventListener("touchstart", this.handleStart);
    this.wrapper.addEventListener("mouseup", this.handleEndEvent);
    this.wrapper.addEventListener("touchend", this.handleEndEvent);
  }

  init() {
    this.addEvents();
    return this;
  }
}
