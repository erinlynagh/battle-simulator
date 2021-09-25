import React from "react";
import { RenderHealth, RenderEffects, RenderMana } from "./RenderElements";

function RenderPerson({ character, currentAttackIndex }) {
  return (
    <div id="character-brief">
      <p className="text-7xl mt-8">{character.emoji}</p>
      <h3>{character.name}</h3>
      {RenderHealth(character.health, character.maxHealth)}
      {RenderMana(character.mana, character.maxMana)}
    </div>
  );
}

export default function RenderCharacter({ character, currentAttackIndex }) {
  var effectDivClassName = "1vh flex px-1 text-pink-600 flex-col";
  if (character?.effect?.length > 0) {
    effectDivClassName = "0px flex flex-col px-1 text-pink-600";
  }
  return (
    <div
      id="character-full"
      className="text-center flex flex-col justify-center items-center"
    >
      <RenderPerson
        character={character}
        currentAttackIndex={currentAttackIndex}
      />
      <div className={effectDivClassName}>
        {character.effects.length > 0 && RenderEffects(character)}
      </div>
    </div>
  );
}
