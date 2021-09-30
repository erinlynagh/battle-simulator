import { makeNewCharacter } from "../../copyClasses";
import * as Effects from "../effectMaker";
import * as Attacks from "../attackMaker/attacks";
import { characterHasEffect } from "../../classes";
import { applyAffect } from "../../battle/attackHelpers";

function getEffectIndex(character, effect) {
  return character.effects.findIndex(({ name }) => name === effect);
}

export default function ApplyAccessories(character) {
  let newCharacter = makeNewCharacter(character);
  if (!newCharacter.accessories || !character.screen === "attack") {
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
      applyAffect(character, Effects.IncreaseMana(1));
      break;
    default:
      break;
  }
}

function copyDefaultAttack(attack) {
  return Attacks[[attack.name]]();
}
