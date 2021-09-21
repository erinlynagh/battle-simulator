import * as AttackData from "../generation/attackMaker";
import * as battleSpells from "../battle/getTwoRandomSpells";
import { Effect, Character } from "../generation/classes";
import Heap from "heap";

function makeNewCharacter(character) {
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

function makeNewEnemies(enemies, target) {
  let newEnemies = enemies.slice();
  const enemy = newEnemies.find(({ id }) => id === target);
  const enemyIndex = newEnemies.findIndex(({ id }) => id === target);
  return { enemy, newEnemies, enemyIndex };
}

function castSpell(newCharacter, character, attack, reset) {
  var newCharacter = makeNewCharacter(character);
  var currentAttackIndex = newCharacter.getAttackIndex(attack.name);
  newCharacter.attacks[currentAttackIndex].casts -= 1;
  if (newCharacter.attacks[currentAttackIndex].casts === 0) {
    newCharacter.attacks.splice(currentAttackIndex, 1);
    reset();
  }
  return newCharacter;
}

function applyAttackEffect(character, attack) {
  const effectIndex = character.getEffectIndex(attack.effect.name);
  if (effectIndex === -1) {
    character.effects.push(
      new Effect(
        attack.effect.name,
        attack.effect.duration,
        attack.effect.description
      )
    );
  } else {
    character.effects[effectIndex].duration += attack.effect.duration - 1;
  }
}

function reduceEffectDurations(enemies, newEnemies) {
  enemies.forEach(function (enemy, enemyIndex) {
    enemy.effects.forEach(function (effect, effectIndex) {
      if (effect.duration > 1) {
        newEnemies[enemyIndex].effects[effectIndex].duration -= 1;
      } else {
        newEnemies[enemyIndex].effects.splice(effectIndex, 1);
      }
    });
  });
}

function getAttackDamage(attack, character, adversary) {
  let damage = attack.power;
  if (adversary.hasEffect("Wither")) {
    damage = 0.75 * damage;
  }
  if (character.hasEffect("Vulnerable")) {
    damage = (4 / 3) * damage;
  }
  damage = Math.floor(damage);
  attack.setAttackMessage(damage);
  return damage;
}

function nextFloor(
  floor,
  allEnemies,
  character,
  updateCharacter,
  updateFloor,
  reset,
  newEnemies
) {
  floor = floor + 1;
  if (floor >= allEnemies.length) {
    alert("you win!");
    window.location.reload();
  } else {
    var newCharacter = makeNewCharacter(character);
    newCharacter.mana = newCharacter.maxMana;
    updateCharacter(newCharacter);
    alert("battle won, to the next one!");
    updateFloor(floor);
    reset();
  }
  newEnemies = allEnemies[floor];
  return newEnemies;
}

export function AttackEnemy(
  character,
  updateCharacter,
  attack,
  target,
  enemies,
  updateEnemies,
  allEnemies,
  floor,
  updateFloor,
  reset,
  setEnemyAttacks
) {
  attack = AttackData[[attack]];

  var { enemy, newEnemies, enemyIndex } = makeNewEnemies(enemies, target);

  applyAttackEffect(enemy, attack);
  reduceEffectDurations(enemies, newEnemies);
  enemy.health -= getAttackDamage(attack, enemy, character);

  if (enemy.health <= 0) {
    newEnemies.splice(enemyIndex, 1);
    reset();
  } else {
    newEnemies[enemyIndex] = enemy;
  }

  if (newEnemies.length === 0) {
    newEnemies = nextFloor(
      floor,
      allEnemies,
      character,
      updateCharacter,
      updateFloor,
      reset,
      newEnemies
    );
  } else if (character.mana === 1) {
    var newCharacter = castSpell(newCharacter, character, attack, reset);
    newCharacter.refreshMana();
    updateCharacter(newCharacter);
    attackPlayer(character, updateCharacter, enemies, setEnemyAttacks);
  } else {
    var newCharacter = castSpell(newCharacter, character, attack, reset);
    newCharacter.mana -= 1;
    updateCharacter(newCharacter);
  }
  updateEnemies(newEnemies);
}

function attackPlayer(character, updateCharacter, enemies, setEnemyAttacks) {
  var newCharacter = makeNewCharacter(character);
  newCharacter.refreshMana();
  var heap = new Heap(function (a, b) {
    return b.priority - a.priority;
  });
  enemies.forEach(function (enemy) {
    if (enemy.health <= 0 || enemy.hasEffect("Stun")) {
      return;
    } else {
      enemy.attacks.forEach(function (attack) {
        attack.enemy = enemy;
        heap.push(attack);
      });
    }
  });

  var attacked = false;
  var enemyAttacks = [];
  while (heap.nodes.length > 0) {
    let attack = heap.pop();
    if (!attacked && Math.random() <= attack.chance) {
      attacked = true;
      enemyAttacks.push(attack);
      applyAttackEffect(character, attack);
      newCharacter.health -= getAttackDamage(attack, character, attack.enemy);
    }
    if (newCharacter.health <= 0) {
      alert("you lose");
      window.location.reload();
    }
    console.log(enemyAttacks);
    setEnemyAttacks(enemyAttacks);
    updateCharacter(newCharacter);
  }
}
