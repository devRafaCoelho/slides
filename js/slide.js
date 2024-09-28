import debounce from "./debounce.js";

export class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.distance = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };
    this.activeClass = "active";

    this.handleStart = this.handleStart.bind(this);
    this.handleEndEvent = this.handleEndEvent.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleActivePrevSlide = this.handleActivePrevSlide.bind(this);
    this.handleActiveNextSlide = this.handleActiveNextSlide.bind(this);
    this.handleResize = debounce(this.handleResize.bind(this), 200);
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
    this.handleTransition(false);
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
    this.handleTransition(true);
    this.handleChangeSlideEndEvent();
  }

  handleChangeSlideEndEvent() {
    if (this.distance.movement > 120 && this.index.next !== undefined) {
      this.handleActiveNextSlide();
    } else if (this.distance.movement < -120 && this.index.prev !== undefined) {
      this.handleActivePrevSlide();
    } else {
      this.handleChangeSlide(this.index.active);
    }
  }

  handleAddEvents() {
    this.wrapper.addEventListener("mousedown", this.handleStart);
    this.wrapper.addEventListener("touchstart", this.handleStart);
    this.wrapper.addEventListener("mouseup", this.handleEndEvent);
    this.wrapper.addEventListener("touchend", this.handleEndEvent);
  }

  handleSlideCenterPosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  handleSlidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.handleSlideCenterPosition(element);
      return { position, element };
    });
  }

  handleSlidesIndexNavigation(index) {
    const last = this.slideArray.length - 1;

    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  handleChangeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.handleMoveSlide(activeSlide.position);
    this.handleSlidesIndexNavigation(index);
    this.distance.finalPosition = activeSlide.position;
    this.handleChangeActiveClass();
  }

  handleChangeActiveClass() {
    this.slideArray.forEach((item) =>
      item.element.classList.remove(this.activeClass)
    );
    this.slideArray[this.index.active].element.classList.add(this.activeClass);
  }

  handleActivePrevSlide() {
    if (this.index.prev !== undefined) {
      this.handleChangeSlide(this.index.prev);
    }
  }

  handleActiveNextSlide() {
    if (this.index.next !== undefined) {
      this.handleChangeSlide(this.index.next);
    }
  }

  handleTransition(active) {
    this.slide.style.transition = active ? "transform 0.3s" : "";
  }

  handleResize() {
    setTimeout(() => {
      this.handleSlidesConfig();
      this.handleChangeSlide(this.index.active);
    }, 1000);
  }

  handleResizeEvent() {
    window.addEventListener("resize", this.handleResize);
  }

  init() {
    this.handleAddEvents();
    this.handleSlidesConfig();
    this.handleTransition(true);
    this.handleResizeEvent();
    this.handleChangeSlide(0);
    return this;
  }
}

export class SlideNav extends Slide {
  handleAddArrow(prev, next) {
    this.prevElement = document.querySelector(prev);
    this.nextElement = document.querySelector(next);
    this.handleAddArrowEvent();
  }

  handleAddArrowEvent() {
    this.prevElement.addEventListener("click", this.handleActivePrevSlide);
    this.nextElement.addEventListener("click", this.handleActiveNextSlide);
  }
}
