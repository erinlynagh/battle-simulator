import { Attack, EnemyAttack } from "./classes";
import * as Effects from "./effectMaker";

// player attacks
export const Fireball = new Attack("Fireball", 10, Effects.None, 5);
export const JetStream = new Attack("Jetstream", 10, Effects.None, 5);
export const Whirlpool = new Attack("Whirlpool", 10, Effects.None, 5);
export const FreezingBeam = new Attack("FreezingBeam", 10, Effects.None, 5);
export const HyperBeam = new Attack("Hyper Beam", 25, Effects.None, 1);

export const StaffSlam = new Attack("Staff Slam", 5, Effects.Vulnerable, 5);
export const Stupefy = new Attack("Stupefy", 0, Effects.Stun(1), 2);
export const Wither = new Attack("Wither", 1, Effects.Wither(3), 3);
export const Teleport = new Attack("Teleport", 0, Effects.Teleport, 1);

// enemy attacks
export const Scratch = new EnemyAttack("Scratch", 2, Effects.None, 1, -1);
export const OrgeSlam = new EnemyAttack(
  "Orge Slam",
  4,
  Effects.Stun(1),
  0.25,
  1
);
