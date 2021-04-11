import intro from "../intro";
import history from "../history";
import { IScene } from "../scene";

const sections = {
  intro,
  history,
}
export type PathName = keyof typeof sections;

let activeSection: IScene | undefined;

export function navigateTo(path: PathName) {
  if (activeSection) {
    activeSection.dispose();
  }
  const section = sections[path];
  if (!section) {
    throw new Error("Cannot find section with name " + path)
  }
  activeSection = section;
  activeSection.init();
}