import { Effect } from "./classes";

export const None = new Effect("None", 0, "");
export const Teleport = new Effect(
  "Teleport",
  0,
  "target is moved to the next floor"
);

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

export function Vulnerable(duration) {
  const description = "takes additional damage";
  return new Effect(
    "Vulnerable",
    duration,
    `target ${description} for BLANK turns`
  );
}

export function Furious(duration) {
  const description = "deals additional damage";
  return new Effect("Furious", duration, ` ${description} for BLANK turns`);
}

export function AppliesToAttacker(effect) {
  if (effect.name === "Furious") {
    return true;
  }
}
