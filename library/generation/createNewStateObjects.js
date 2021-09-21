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
    character.maxMana,
    character.id
  );
}

export function makeNewEnemies(enemies, target) {
  let newEnemies = [];
  enemies.forEach((enemy) => {
    newEnemies.push(makeNewCharacter(enemy));
  });
  return newEnemies;
}
