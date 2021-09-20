import { Effect } from "./classes";

export const None = new Effect("None", 0, "No Effect");

export function Stun(duration) {
  return new Effect(
    "Stun",
    duration,
    "The enemy cannot act for the specified amount of turns"
  );
}
