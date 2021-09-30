import { newAttack } from "./attacks";
import * as Effects from "../effectMaker";

export function ReflectiveCoating() {
  const name = "ReflectiveCoating";
  const damage = 0;
  const effect = Effects.Reflect(1);
  const casts = 1;
  return newAttack(name, damage, effect, casts);
}

export function HyperBeam() {
  const name = "HyperBeam";
  const damage = 20;
  const effect = Effects.None;
  const casts = 1;
  return newAttack(name, damage, effect, casts);
}

export function Torment() {
  const name = "Torment";
  const damage = 5;
  const effect = Effects.Doomed(2);
  const casts = 2;
  return newAttack(name, damage, effect, casts);
}

export function Chrysopoeia() {
  const name = "Chrysopoeia";
  const damage = 0;
  const effect = Effects.Midas(9);
  const casts = 1;
  return newAttack(name, damage, effect, casts);
}

export function CircularCurse() {
  const name = "CircularCurse";
  const damage = 3;
  const effect = Effects.Ouroboros();
  const casts = 2;
  return newAttack(name, damage, effect, casts);
}

// Right now the engine doesn't allow for editing the character and killing an enemy in the same spell... :(
// export function ReapSpirit() {
//   const name = "ReapSpirit";
//   const damage = 10;
//   const effect = Effects.IncreaseMana(1);
//   const casts = 1;
//   return newAttack(name, damage, effect, casts);
// }
