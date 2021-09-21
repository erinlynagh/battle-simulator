import { Character } from "./classes";
import * as Attacks from "./attackMaker";
import * as Effects from "./effectMaker";

const defaultName = "Erin";
const startingHealth = 20;
const defaultEmoji = "wizard";
const defaultEffect = [];
const defaultMana = 3;

export function makeCharacter(
  name = defaultName,
  health = startingHealth,
  maxHealth = 20,
  emojiName = defaultEmoji,
  effects = defaultEffect,
  mana = defaultMana,
  maxMana = defaultMana
) {
  return new Character(
    name,
    health,
    maxHealth,
    [Attacks.Fireball, Attacks.Stupefy, Attacks.Wither],
    emojiName,
    effects,
    mana,
    maxMana
  );
}
