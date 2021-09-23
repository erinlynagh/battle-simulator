import { EnemyAttack } from "../classes";
import * as Effects from "./effectMaker";
export function Scratch() {
  let attack = new EnemyAttack("Scratch", 2, Effects.None, 1, -1);
  return attack;
}
export function Gouge() {
  let attack = new EnemyAttack("Gouge", 4, Effects.None, 1, -1);
  return attack;
}
export function OgreSlam() {
  let attack = new EnemyAttack("Orge Slam", 4, Effects.Stun(1), 0.15, 1);
  return attack;
}
export function HowlingBite() {
  let attack = new EnemyAttack("Howling Bite", 6, Effects.Furious(2), 0.5, 0);
  return attack;
}

export function GoblinsTrick() {
  let attack = new EnemyAttack("Goblin's Trick", 2, Effects.Stun(1), 0.75, 2);
  return attack;
}

export function DrainingStab() {
  let attack = new EnemyAttack("Draining Stab", 4, Effects.Wither(4), 1, 1);
  return attack;
}
