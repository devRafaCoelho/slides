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
    event.preventDefault();
    this.distance.startX = event.clientX;
    this.wrapper.addEventListener("mousemove", this.handleMove);
  }

  handleMove(event) {
    const updatedPosition = this.handleUpdatePosition(event.clientX);
    this.handleMoveSlide(updatedPosition);
  }

  handleEndEvent() {
    this.wrapper.removeEventListener("mousemove", this.handleMove);
    this.distance.finalPosition = this.distance.movePosition;
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
