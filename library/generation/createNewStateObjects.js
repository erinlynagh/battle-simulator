import { Character, Attack } from "../generation/classes";
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

export function makeNewEnemies(enemies) {
  let newEnemies = [];
  enemies.forEach((enemy) => {
    newEnemies.push(makeNewCharacter(enemy));
  });
  return newEnemies;
}

export function makeNewAttack(attack) {
  return new Attack(attack.name, attack.power, attack.effect, attack.casts);
}

export function spoofAttack(
  name = "spoofAttack",
  power = 0,
  effect = "",
  casts = 2
) {
  return new Attack(name, power, effect, casts);
}
