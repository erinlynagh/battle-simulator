import { Character, Attack, Item, Accessory } from "./classes";

export function makeNewCharacter(character) {
  let newCharacter = new Character(
    character.name,
    character.health,
    character.maxHealth,
    character.attacks,
    character.emojiName,
    character.effects,
    character.mana,
    character.maxMana,
    character.id,
    false,
    character.coins,
    character.items,
    character.accessories
  );
  return newCharacter;
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

export function makeNewItem(item) {
  return new Item(item.name, item.description, item.emojiName);
}
export function MakeNewAccessory(accessory) {
  return new Accessory(
    accessory.name,
    accessory.description,
    accessory.emojiName
  );
}

export function spoofAttack(enemy) {
  let name = enemy.name;
  let spoofAttack = new Attack(name, 0, "", 2);
  spoofAttack.id = enemy.id;
  spoofAttack.spoof = true;
  return spoofAttack;
}
