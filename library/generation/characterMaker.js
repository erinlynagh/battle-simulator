import { Character } from "./classes";
import * as Attacks from "./attackMaker";

const defaultName = "Erin";
const startingHealth = 20;
const defaultEmoji = "wizard";

export function makeCharacter(
  name = defaultName,
  health = startingHealth,
  emojiName = defaultEmoji
) {
  return new Character(
    name,
    health,
    [Attacks.Fireball, Attacks.Stupefy],
    emojiName
  );
}
