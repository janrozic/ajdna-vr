export function cloneDeep<T extends object>(o: T): T {
  return JSON.parse(JSON.stringify(o));
}

export const USER_HEIGHT = 1.7;