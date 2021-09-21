import { Attack, EnemyAttack } from "./classes";
import * as Effects from "./effectMaker";
// player attacks

export function Fireball() {
  let attack = new Attack("Fireball", 10, Effects.None, 50);
  return attack;
}
export function HyperBeam() {
  let attack = new Attack("Hyper Beam", 25, Effects.None, 1);
  return attack;
}
export function StaffSlam() {
  let attack = new Attack("Staff Slam", 5, Effects.Vulnerable, 5);
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
// enemy attacks

export function Scratch() {
  let attack = new EnemyAttack("Scratch", 2, Effects.None, 1, -1);
  return attack;
}
export function Gouge() {
  let attack = new EnemyAttack("Gouge", 4, Effects.None, 1, -1);
  return attack;
}
export function OgreSlam() {
  let attack = new EnemyAttack("Orge Slam", 4, Effects.Stun(1), 0.25, 1);
  return attack;
}
export function HowlingBite() {
  let attack = new EnemyAttack("Howling Bite", 6, Effects.Furious(2), 0.5, 0);
  return attack;
}
