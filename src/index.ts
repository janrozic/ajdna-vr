import { navigateTo } from "./helpers/navigation";

AFRAME.registerComponent('start-here', {
  init: function () {
    navigateTo("intro");
  }
});