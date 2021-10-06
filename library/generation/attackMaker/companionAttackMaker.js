import { EnemyAttack } from "../../classes";
import * as Effects from "../effectMaker";

export function SuctionCups() {
  let attack = new EnemyAttack("Suction Cups", 3, Effects.Stun(1), 0.5, 1);
  return attack;
}
export function Squeeze() {
  let attack = new EnemyAttack("Squeeze", 5, Effects.None, 1, -1);
  return attack;
}
