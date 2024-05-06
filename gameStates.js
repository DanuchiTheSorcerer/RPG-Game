import { InputController } from "./extraModules/inputController"
import { DrawController } from "./extraModules/drawController"
import { Canvas } from "./extraModules/canvas"


export class GameState {
    constructor(name,drawController) {
      this.name = name
      this.drawController = drawController
      this.inputController = new InputController()
      this.updateFrame = this.updateFrame.bind(this);
    }
    load(callback) {
      this.resetState();
      this.drawController.newSprite(0, 0, 0, 1200, "../sprites/gameTitle.png");
      this.drawController.newButton(0, 300, 400, 600, 100, [127, 63, 31], "Continue Game");
      this.updateFrame(() => {
        alert("up call" + this.inputController.leftMouse)
        callback();
      });
    }
    updateFrame(callback) {
      let inputPacket = this.inputController.getInputPacket();
      this.drawController.refreshAll(inputPacket);
      this.logicFrame()
      if (!inputPacket.leftMouse) {
        requestAnimationFrame(() => this.updateFrame(callback)); // Calling itself recursively
      } else {
        callback(); // Call the callback function once animation stops
      }
    }
    logicFrame() {
    }
    resetState() {
      this.inputController = new InputController()
    }
};



export class Title extends GameState {
    constructor() {
        super("title", new DrawController([new Canvas(0,0,1,1,1,"main")]));
    }
};

export class Dungeon extends GameState {
  constructor() {
      super("dungeon", new DrawController([new Canvas(0,0,0.25,1,1,"side"),new Canvas(0.25,0,0.75,0.67,1,"main"),new Canvas(0.25,0.67,0.75,0.33,1,"bottom")]));
  }
};