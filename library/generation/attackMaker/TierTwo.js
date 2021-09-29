import { newAttack } from "./attacks";
import * as Effects from "../effectMaker";

export function Stupefy() {
  const name = "Stupefy";
  const damage = 0;
  const effect = Effects.Stun(1);
  const casts = 2;
  return newAttack(name, damage, effect, casts);
}
export function MagicMissile() {
  const name = "MagicMissile";
  const damage = 13;
  const effect = Effects.None;
  const casts = 3;
  return newAttack(name, damage, effect, casts);
}

export function Hex() {
  const name = "Hex";
  const damage = 0;
  const effect = Effects.Curse(5);
  const casts = 3;
  return newAttack(name, damage, effect, casts);
}

export function Enrage() {
  const name = "Enrage";
  const damage = 7;
  const effect = Effects.Furious(3);
  const casts = 2;
  return newAttack(name, damage, effect, casts);
}
