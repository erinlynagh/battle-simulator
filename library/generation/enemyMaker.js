import { Enemy } from "./classes";
import * as Attacks from "./attackMaker";

export function makeBat() {
  return new Enemy("Bat", 7, [Attacks.Scratch, Attacks.OrgeSlam], "bat");
}

export function makeOrge() {
  return new Enemy(
    "Orge",
    25,
    [Attacks.Scratch, Attacks.OrgeSlam],
    "japanese_ogre"
  );
}
