import { Effect } from "./classes";

export const None = new Effect("None", 0, "");

export function Stun(duration) {
  const description = "cannot act";
  return new Effect("Stun", duration, `target ${description} for BLANK turns`);
}

export function Wither(duration) {
  const description = "has reduced strength";
  return new Effect(
    "Wither",
    duration,
    `target ${description} for BLANK turns`
  );
}
