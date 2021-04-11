import { Entity } from "aframe";
import { EntityAttributes } from "./aframeTypes";

function getScene(): HTMLElement {
  const scene = document.getElementById("main");
  if (!scene) {
    throw new Error("cannot get main element");
  }
  return scene;
}

export function setEntityAttributes(el: Entity, attrs?: Partial<EntityAttributes>): Entity {
  if (attrs) {
    type Key = keyof EntityAttributes;
    const kvAttrs: Array<[Key, EntityAttributes[Key]]> = attrs ? Object.entries(attrs) : [] as any;
    for (const [key, val] of kvAttrs) {
      if (key === "position") {
        const pos = (val as EntityAttributes["position"]).map(String);
        el.setAttribute(key, pos[0] + " " + pos[2] + " " + pos[1]);
      } else if (key === "className" || key === "clickable") {
        continue;
      } else {
        el.setAttribute(key, val);
      }
    }
    if (attrs.clickable) {
      el.classList.add("clickable");
    }
  }
  return el;
}

export function newEntity(): Entity {
  return document.createElement('a-entity');
}

// export function createEntity(attrs?: Partial<EntityAttributes>): Entity {
//   const el = document.createElement('a-entity');
//   if (attrs) {
//     type Key = keyof EntityAttributes;
//     const kvAttrs: Array<[Key, EntityAttributes[Key]]> = attrs ? Object.entries(attrs) : [] as any;
//     for (const [key, val] of kvAttrs) {
//       if (key === "position") {
//         const pos = (val as EntityAttributes["position"]).map(String);
//         el.setAttribute(key, pos[0] + " " + pos[2] + " " + pos[1]);
//       } else if (key === "className" || key === "clickable") {
//         continue;
//       } else {
//         el.setAttribute(key, val);
//       }
//     }
//     let className = attrs["className"] || "";
//     if (attrs.clickable) {
//       el.setAttribute("data-clickable", "");
//       className += " clickable";
//     }
//     className = className.trim();
//     el.setAttribute("class", className);
//     el.className = className;
//     el.classList.add("clickable");
//   }
//   return el;
// }

export function attachEntity(el?: Entity): Entity {
  const scene = getScene();
  if (!el) {
    el = newEntity();
  }
  scene.appendChild(el);
  return el;
}

export function detachEntity(e: Entity | string | undefined) {
  const el = typeof e === "string" ? document.getElementById(e) : e;
  if (!el) {
    return;
  }
  getScene().removeChild(el);
}

const SKY_ID = "default-sky";

export function addSky() {
  const el = document.createElement('a-sky');
  el.setAttribute("color", "#222222");
  el.setAttribute("id", SKY_ID);
  el.setAttribute("radius", 5000);
  attachEntity(el);
  return el;
}

export function removeSky() {
  detachEntity(SKY_ID);
}
