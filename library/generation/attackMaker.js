import { Attack } from "./classes";
import * as Effects from "./effectMaker";

export const Fireball = new Attack("Fireball", 10, Effects.None);

export const Scratch = new Attack("Scratch", 5, Effects.None);

export const Stupefy = new Attack("Stupefy", 5, Effects.Stun(2));
export const OrgeSlam = new Attack("Orge Slam", 5, Effects.Stun(2));
