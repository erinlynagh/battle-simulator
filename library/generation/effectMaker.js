import { Effect } from "./classes";

export const None = new Effect("None", 0, "No Effect");

export function Stun(duration) {
  return new Effect("Stun", duration, "cannot act for BLANK turns");
}
