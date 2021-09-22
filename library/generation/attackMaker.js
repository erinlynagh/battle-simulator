import { Attack } from "./classes";
import * as Effects from "./effectMaker";
// player attacks

export function Fireball() {
  let attack = new Attack("Fireball", 10, Effects.None, 5);
  return attack;
}
export function HyperBeam() {
  let attack = new Attack("HyperBeam", 25, Effects.None, 1);
  return attack;
}
export function StaffSlam() {
  let attack = new Attack("StaffSlam", 5, Effects.Vulnerable(3), 5);
  return attack;
}
export function Stupefy() {
  let attack = new Attack("Stupefy", 0, Effects.Stun(1), 2);
  return attack;
}
export function Wither() {
  let attack = new Attack("Wither", 1, Effects.Wither(3), 3);
  return attack;
}
export function Teleport() {
  let attack = new Attack("Teleport", 0, Effects.Teleport, 1);
  return attack;
}
