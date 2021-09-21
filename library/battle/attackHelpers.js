import { Effect } from "../generation/classes";
import * as StateHelpers from "../generation/createNewStateObjects";

// character attacks adversary with attack
export function Attack(attacker, attack, defender) {
  applyAttackEffect(defender, attack);
  defender.health -= calculateAttackDamage(attack, defender, attacker);
}

function calculateAttackDamage(attack, defender, attacker) {
  let damage = attack.power;
  if (attacker.hasEffect("Wither")) {
    damage = 0.75 * damage;
  }
  if (defender.hasEffect("Vulnerable")) {
    damage = (4 / 3) * damage;
  }
  damage = Math.floor(damage);
  attack.setAttackMessage(damage);
  return damage;
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
    character.effects[effectIndex].duration += attack.effect.duration;
  }
}

export function castSpell(newCharacter, character, attack, reset) {
  var newCharacter = StateHelpers.makeNewCharacter(character);
  var currentAttackIndex = newCharacter.getAttackIndex(attack.name);
  newCharacter.attacks[currentAttackIndex].casts -= 1;
  if (newCharacter.attacks[currentAttackIndex].casts === 0) {
    newCharacter.attacks.splice(currentAttackIndex, 1);
    reset();
  }
  return newCharacter;
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
