import { Enemy } from "./classes";
import * as Attacks from "./attackMaker";

export function makeBat() {
  return new Enemy("Basic Bat", 20, [Attacks.Scratch], "bat", 20);
}
