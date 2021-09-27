import { Effect } from "../classes";

export const None = new Effect("None", 0, "");

//Target Defender

export function Stun(duration) {
  const description = "cannot act";
  return new Effect("Stun", duration, `Target ${description} for BLANK turns`);
}

export function Wither(duration) {
  const description = "has reduced strength";
  return new Effect(
    "Wither",
    duration,
    `Target ${description} for BLANK turns`
  );
}

export function Vulnerable(duration) {
  const description = "takes additional damage";
  return new Effect(
    "Vulnerable",
    duration,
    `Target ${description} for BLANK turns`
  );
}

export function Curse(duration) {
  const description = "takes BLANK damage";
  return new Effect("Curse", duration, `Target ${description} this turn`);
}

export function Doomed(duration) {
  const description = `takes damage equal to ${duration}x it's Curse`;
  return new Effect("Doomed", duration, `Target ${description}`);
}

//target attacker

export function Furious(duration) {
  const description = "deals additional damage";
  return new Effect("Furious", duration, `User ${description} for BLANK turns`);
}

export function Reflect(duration) {
  const description = "incoming damage is dealt back to attacker";
  return new Effect("Reflect", duration, `User ${description} for BLANK turns`);
}

export function Heal(duration) {
  const description = "heals 5 health";
  return new Effect("Heal", duration, `User ${description} for BLANK turns`);
}

export function Midas(duration) {
  const description = `grants user ${duration} gold`;
  return new Effect("Midas", duration, description);
}

export function AppliesToAttacker(effect) {
  if (
    effect.name === "Furious" ||
    effect.name === "Reflect" ||
    effect.name === "Midas" ||
    effect.name === "Heal"
  ) {
    return true;
  }
}
