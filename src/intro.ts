import { IScene } from "./scene";
import { Entity } from "aframe";
import { attachEntity, newEntity, detachEntity, setEntityAttributes } from "./helpers/dom";
import { navigateTo, PathName } from "./helpers/navigation";
import { EntityAttributes } from "./helpers/aframeTypes";
import { cloneDeep, USER_HEIGHT } from "./helpers/utils";

const R_FIXED = 2;
const R_INACTIVE = 1.9;
const R_ACTIVE = 1.7;

const H = 0.5;

class Intro implements IScene {

  init() {
    // addSky();
    this.addMenu();
  }
  menu: Entity | undefined;
  addMenuItem(z: number, title: string, color: string, link?: PathName) {
    if (!this.menu) {
      throw new Error("Add menu first!");
    }
    const attrs = (moves: boolean): Partial<EntityAttributes> => cloneDeep({
      geometry: {
        primitive: "cylinder",
        radius: moves ? R_INACTIVE : R_FIXED,
        height: H,
        openEnded: true,
      },
      clickable: !moves,
      text: {
        value: title,
        color: "#FFFFFF",
      },
      material: {
        side: "back",
        color,
        opacity: moves ? 0.5: 0,
        transparent: true,
      },
      position: [0, 0, z],
    });
    const moves = newEntity();
    const clickable = newEntity();
    
    this.menu.appendChild(moves);
    this.menu.appendChild(clickable);
    setEntityAttributes(moves, attrs(true));
    setEntityAttributes(clickable, attrs(false));
    if (link) {
      clickable.addEventListener("click", () => navigateTo(link));
    }
    clickable.addEventListener("mouseenter", () => {
      moves.setAttribute("geometry", "radius", R_ACTIVE);
      moves.setAttribute("material", "opacity", 0.9);
    });
    clickable.addEventListener("mouseleave", () => {
      moves.setAttribute("geometry", "radius", R_INACTIVE);
      moves.setAttribute("material", "opacity", 0.5);
    });
  }
  addMenu() {
    this.menu = attachEntity();
    this.addMenuItem(USER_HEIGHT - H * 1.2, "ajdna nekoč", "#fc4e03");
    this.addMenuItem(USER_HEIGHT, "ajdna danes", "#00ff2a");
    this.addMenuItem(USER_HEIGHT + H * 1.2, "zgodovina", "#4000ff", "history");
  }  
  dispose() {
    detachEntity(this.menu);
    // removeSky();
  }
}

const intro = new Intro();
export default intro;
