import { Enemy } from "./classes";
import * as Attacks from "./attackMaker";

export function makeBat() {
  return new Enemy("Basic Bat", 20, [Attacks.Scratch], "bat", 20);
}

export function makeOrge() {
  return new Enemy(
    "Orge",
    30,
    [Attacks.Scratch, Attacks.Stupefy],
    "japanese_ogre",
    30
  );
}
