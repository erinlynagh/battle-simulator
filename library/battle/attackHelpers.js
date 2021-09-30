import { Effect } from "../classes";
import * as Effects from "../generation/effectMaker";
import { AppliesToAttacker } from "../generation/effectMaker";
import { characterHasEffect as hasEffect } from "../classes";
import random from "random";
import { setAttackMessage } from "../classes";

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(random.float() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// character attacks adversary with attack
export function Attack(attacker, attack, defender, reset = false) {
  defender.health -= calculateAttackDamage(attack, defender, attacker);
  applyAttackEffect(attack.effect, defender, attacker);
  if (reset) {
    castSpell(attacker, attack, reset);
  }
}

function calculateAttackDamage(attack, defender, attacker) {
  // TODO: Re-Balance these equations
  let damage = attack.power;
  if (hasEffect(attacker, "Wither")) {
    damage = (1 / 1.5) * damage;
  }
  if (hasEffect(attacker, "Furious")) {
    damage = 1.5 * damage;
  }
  if (hasEffect(defender, "Vulnerable")) {
    damage = 1.5 * damage;
  }
  damage = Math.floor(damage);
  setAttackMessage(attack, damage);
  return damage;
}

function applyAttackEffect(effect, defender, attacker) {
  let recipient = defender;
  if (AppliesToAttacker(effect)) {
    recipient = attacker;
  }
  applyAffect(recipient, effect);
}

export function applyAffect(character, effect) {
  if (effect.name === "Heal") {
    if (character.health + 5 <= character.maxHealth) {
      character.health += 5;
    } else {
      character.health = character.maxHealth;
    }
    return;
  }
  if (effect.name === "Midas") {
    character.coins += effect.duration;
    return;
  }
  const effectIndex = getEffectIndex(character, effect.name);
  if (effectIndex === -1) {
    character.effects.push(
      new Effect(effect.name, effect.duration, effect.description)
    );
  } else {
    character.effects[effectIndex].duration += effect.duration;
  }
}

function castSpell(character, attack, reset) {
  var currentAttackIndex = getAttackIndex(character, attack.name);
  character.attacks[currentAttackIndex].casts -= 1;
  if (character.attacks[currentAttackIndex].casts === 0) {
    character.attacks.splice(currentAttackIndex, 1);
    reset();
  }
}

export function reduceEnemiesEffectDurations(newEnemies) {
  newEnemies.forEach(function (enemy) {
    reduceCharacterEffectDurations(enemy);
  });
}

export function reduceCharacterEffectDurations(character) {
  character.effects.forEach(function (effect, effectIndex) {
    if (effect.name === "Doctored") {
      if (character.health + effect.duration >= character.maxHealth) {
        character.health = character.maxHealth;
      } else {
        character.health += effect.duration;
      }
      character.effects[effectIndex].duration = 1;
    }
    if (effect.name === "IncreaseMana") {
      character.mana += 1;
    }
    if (effect.duration > 0) {
      character.effects[effectIndex].duration -= 1;
    }
    if (character.effects[effectIndex].duration <= 0) {
      character.effects.splice(effectIndex, 1);
    }
  });
}

function getEffectIndex(character, effect) {
  return character.effects.findIndex(({ name }) => name === effect);
}

function getAttackIndex(character, attack) {
  return character.attacks.findIndex(({ name }) => name === attack);
}

export function killEnemy(enemies, enemyIndex, handleShopModal) {
  ApplyOuroboros(enemies, enemyIndex);
  enemies.splice(enemyIndex, 1);
  handleShopModal();
}

function ApplyOuroboros(enemies, enemyIndex) {
  let enemy = enemies[enemyIndex];
  if (enemy && hasEffect(enemy, "Ouroboros") && hasEffect(enemy, "Curse")) {
    let randomEnemies = enemies.slice();
    let curseDamage =
      enemy.effects[enemy.effects.findIndex((x) => x.name === "Curse")]
        .duration;
    let flag = false;
    shuffleArray(randomEnemies);
    randomEnemies.forEach((randEnemy) => {
      if (randEnemy.health > 0) {
        flag = true;
        if (hasEffect(randEnemy, "Curse")) {
          randEnemy.effects[
            randEnemy.effects.findIndex((x) => x.name === "Curse")
          ].duration += curseDamage;
        } else {
          randEnemy.effects.push(
            new Effect("Curse", curseDamage, Effects[["Curse"]]().description)
          );
        }
      }
    });
  }
}
