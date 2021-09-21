import { Enemy } from "./classes";
import * as Attacks from "./attackMaker";

export function makeBat() {
  return new Enemy("Bat", 7, [Attacks.Scratch], "bat");
}

export function makeOgre() {
  return new Enemy(
    "Ogre",
    25,
    [Attacks.Gouge, Attacks.OrgeSlam],
    "japanese_ogre"
  );
}

export function makeWolf() {
  return new Enemy("Wolf", 25, [Attacks.Gouge, Attacks.HowlingBite], "wolf");
}
