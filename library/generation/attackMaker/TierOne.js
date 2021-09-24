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
