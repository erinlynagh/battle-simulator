import { makeNewCharacter } from "../../copyClasses";
import * as Effects from "../effectMaker";
import * as Attacks from "../attackMaker/attacks";
import { characterHasEffect } from "../../classes";

function getEffectIndex(character, effect) {
  return character.effects.findIndex(({ name }) => name === effect);
}

export default function ApplyAccessories(character) {
  let newCharacter = makeNewCharacter(character);
  if (!newCharacter.accessories) {
    return character;
  }
  newCharacter.accessories.forEach((accessory) => {
    ApplyAccessory(accessory, newCharacter);
  });
}

function ApplyAccessory(accessory, character) {
  switch (accessory.name) {
    case "NazarAmulet":
      character.attacks.forEach((attack, index) => {
        let newAttack = copyDefaultAttack(attack);
        newAttack.casts = attack.casts;
        newAttack.power += 1;
        character.attacks[index] = newAttack;
      });
      break;
    case "Biohazard":
      character.attacks.forEach((attack, index) => {
        if (attack.effect.name === "Curse") {
          let newAttack = copyDefaultAttack(attack);
          newAttack.casts = attack.casts;
          newAttack.effect.duration += 1;
          character.attacks[index] = newAttack;
        }
      });
      break;
    case "PortableDoctor":
      if (character.attacks.length > 0) {
        ApplyEffectToCharacter(character, "Doctored");
      }
      break;
    case "Coffee":
      ApplyEffectToCharacter(character, "Coffee");
      break;
    default:
      break;
  }
}

function ApplyEffectToCharacter(character, effectName) {
  let effectIndex = getEffectIndex(character, effectName);
  if (effectIndex === -1) {
    character.effects.push(Effects[[effectName]]());
  } else {
    character.effects[effectIndex].duration = 2;
  }
}

function copyDefaultAttack(attack) {
  return Attacks[[attack.name]]();
}
