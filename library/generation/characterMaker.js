import { Character } from "./classes";
import * as Attacks from "./attackMaker";
import * as Effects from "./effectMaker";

const defaultName = "Erin";
const startingHealth = 20;
const defaultEmoji = "wizard";
const defaultEffect = [Effects.Stun(99)];

export function makeCharacter(
  name = defaultName,
  health = startingHealth,
  emojiName = defaultEmoji,
  effects = defaultEffect
) {
  return new Character(
    name,
    health,
    [Attacks.Fireball, Attacks.Stupefy, Attacks.Wither],
    emojiName,
    effects
  );
}
