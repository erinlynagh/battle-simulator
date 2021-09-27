import { Effect } from "../classes";
import { AppliesToAttacker } from "../generation/effectMaker";
import { characterHasEffect as hasEffect } from "../classes";
import { setAttackMessage } from "../classes";

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
    damage = 0.75 * damage;
  }
  if (hasEffect(attacker, "Furious")) {
    damage = (4 / 3) * damage;
  }
  if (hasEffect(defender, "Vulnerable")) {
    damage = (4 / 3) * damage;
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

function applyAffect(character, effect) {
  if (effect.name === "Heal") {
    if (character.health + 5 <= character.maxHealth) {
      character.health += 5;
    } else {
      character.health = character.maxHealth;
    }
    return;
  }
  if (effect.name === "Midas") {
    console.log("increasing coins by " + effect.duration);
    console.log(character);
    character.coins += effect.duration;
    console.log(character);
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
  if (character.mana <= 1) {
    character.refreshMana();
  } else {
    character.mana -= 1;
  }
}

export function reduceEnemiesEffectDurations(newEnemies) {
  newEnemies.forEach(function (enemy) {
    reduceCharacterEffectDurations(enemy);
  });
}

export function reduceCharacterEffectDurations(character) {
  character.effects.forEach(function (effect, effectIndex) {
    if (effect.duration > 1) {
      character.effects[effectIndex].duration -= 1;
    } else {
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

export function killEnemy(enemies, enemyIndex, handleShopModal, reset) {
  enemies.splice(enemyIndex, 1);
  handleShopModal();
  reset();
}
