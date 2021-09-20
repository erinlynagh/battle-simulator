import { Attack, EnemyAttack } from "./classes";
import * as Effects from "./effectMaker";

// player attacks
export const Fireball = new Attack("Fireball", 10, Effects.None);
export const Stupefy = new Attack("Stupefy", 5, Effects.Stun(2));

// enemy attacks
export const Scratch = new EnemyAttack("Scratch", 5, Effects.None);
export const OrgeSlam = new EnemyAttack("Orge Slam", 5, Effects.Stun(3));
