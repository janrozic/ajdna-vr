import { Entity } from "aframe";
import { attachEntity, detachEntity, setEntityAttributes } from "./helpers/dom";
import { navigateTo } from "./helpers/navigation";
import { USER_HEIGHT } from "./helpers/utils";
import { IScene } from "./scene";

class History implements IScene {
  back: Entity | undefined;
  init(): void {
    this.addBackButton();
  }
  dispose(): void {
    detachEntity(this.back);
  }
  addBackButton() {
    this.back = attachEntity();
    setEntityAttributes(this.back, {
      geometry: {
        primitive: "circle",
        radius: 0.5,
      },
      material: {
        side: "double",
        color: "red",
      },
      clickable: true,
      position: [2, 2, USER_HEIGHT],
    });
    this.back.addEventListener("click", () => navigateTo("intro"));
  }
}

const history = new History;

export default history;