import { Character, Attack } from "./classes";
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
    character.id,
    false
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

export function spoofAttack(enemy) {
  let name = enemy.name;
  let spoofAttack = new Attack(name, 0, "", 2);
  spoofAttack.id = enemy.id;
  spoofAttack.spoof = true;
  return spoofAttack;
}
