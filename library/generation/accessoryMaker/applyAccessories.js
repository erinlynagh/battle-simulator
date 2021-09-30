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
  // you cannot modify the object, only it's properties b/c it's a shallow copy
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
      let healingAmount = 4;
      if (!characterHasEffect(character, "Doctored")) {
        character.effects.push(Effects.Doctored(healingAmount));
      } else {
        character.effects[getEffectIndex(character, "Doctored")].duration += 1;
      }
      break;
    case "Coffee":
      console.log("Coffee");
      const effectIndex = getEffectIndex(character, "IncreaseMana");
      if (effectIndex === -1) {
        character.effects.push(Effects.IncreaseMana());
      } else {
        character.effects[effectIndex].duration = 2;
      }
      break;
    default:
      break;
  }
}

function copyDefaultAttack(attack) {
  return Attacks[[attack.name]]();
}
