import { Attack } from "./classes";
import * as Effects from "./effectMaker";
import { makeNewAttack } from "./createNewStateObjects";
// player attacks

function newAttack(name, damage, effect, casts) {
  let attack = new Attack(name, damage, effect, casts);
  return attack;
}

export function Fireball() {
  const name = "Fireball";
  const damage = 7;
  const effect = Effects.None;
  const casts = 5;
  return newAttack(name, damage, effect, casts);
}

export function MagicMissile() {
  const name = "MagicMissile";
  const damage = 11;
  const effect = Effects.None;
  const casts = 3;
  return newAttack(name, damage, effect, casts);
}

export function HyperBeam() {
  const name = "HyperBeam";
  const damage = 20;
  const effect = Effects.None;
  const casts = 1;
  return newAttack(name, damage, effect, casts);
}

export function StaffSlam() {
  const name = "StaffSlam";
  const damage = 5;
  const effect = Effects.Vulnerable(3);
  const casts = 5;
  return newAttack(name, damage, effect, casts);
}
export function Stupefy() {
  const name = "Stupefy";
  const damage = 0;
  const effect = Effects.Stun(1);
  const casts = 2;
  return newAttack(name, damage, effect, casts);
}
export function Wither() {
  const name = "Wither";
  const damage = 3;
  const effect = Effects.Wither(7);
  const casts = 3;
  return newAttack(name, damage, effect, casts);
}

export function ReflectiveCoating() {
  const name = "ReflectiveCoating";
  const damage = 0;
  const effect = Effects.Reflect(1);
  const casts = 1;
  return newAttack(name, damage, effect, casts);
}

export function Rejuvenate() {
  const name = "Rejuvenate";
  const damage = 0;
  const effect = Effects.Heal(1);
  const casts = 1;
  return newAttack(name, damage, effect, casts);
}
