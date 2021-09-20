import { Effect } from "./classes";

export const None = new Effect("None", 0, "");

export function Stun(duration) {
  return new Effect("Stun", duration, "target cannot act for BLANK turns");
}
