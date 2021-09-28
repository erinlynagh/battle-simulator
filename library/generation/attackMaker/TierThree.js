import { newAttack } from "./attacks";
import * as Effects from "../effectMaker";

export function Fireball() {
  const name = "Fireball";
  const damage = 1;
  const effect = Effects.None;
  const casts = 5;
  return newAttack(name, damage, effect, casts);
}

export function StaffSlam() {
  const name = "StaffSlam";
  const damage = 5;
  const effect = Effects.Vulnerable(3);
  const casts = 5;
  return newAttack(name, damage, effect, casts);
}

export function Wither() {
  const name = "Wither";
  const damage = 3;
  const effect = Effects.Wither(7);
  const casts = 3;
  return newAttack(name, damage, effect, casts);
}

export function Rejuvenate() {
  const name = "Rejuvenate";
  const damage = 0;
  const effect = Effects.Heal(1);
  const casts = 1;
  return newAttack(name, damage, effect, casts);
}
