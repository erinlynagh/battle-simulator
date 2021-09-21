import { Attack, EnemyAttack } from "./classes";
import * as Effects from "./effectMaker";

// player attacks
export const Fireball = new Attack("Fireball", 10, Effects.None, 5);
export const Stupefy = new Attack("Stupefy", 0, Effects.Stun(1), 2);
export const Wither = new Attack("Wither", 1, Effects.Wither(3), 3);

// enemy attacks
export const Scratch = new EnemyAttack("Scratch", 2, Effects.None, 1, -1);
export const OrgeSlam = new EnemyAttack(
  "Orge Slam",
  4,
  Effects.Stun(1),
  0.25,
  1
);
