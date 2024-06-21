export class GameLoop {
  constructor(update, render) {
    console.log("🚀 ~ GameLoop ~ constructor ~ update:", update);
    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeStep = 1000 / 60; //60 frames per second

    this.update = update;
    this.render = render;

    this.rafId = null;
    this.isRunning = false;
  }

  mainLoop = (timeStamp) => {
    if (!this.isRunning) return;
    let deltaTime = timeStamp - this.lastFrameTime;
    this.lastFrameTime = timeStamp;

    //Accumulate all the time since the last frame
    this.accumulatedTime += deltaTime;

    //Fixed time step updates
    //If there's enough accumulated time to run one or more fixed update
    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep);
      this.accumulatedTime -= this.timeStep;
    }

    //Render
    this.render();

    this.rafId = requestAnimationFrame(this.mainLoop);
  };

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.rafId = requestAnimationFrame(this.mainLoop);
    }
  }
  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.isRunning = false;
  }
}
