import { Character } from "../generation/classes";
export function makeNewCharacter(character) {
  return new Character(
    character.name,
    character.health,
    character.maxHealth,
    character.attacks,
    character.emojiName,
    character.effects,
    character.mana,
    character.maxMana
  );
}

export function makeNewEnemies(enemies, target) {
  return enemies.slice();
}
