import React from "react";
import { RenderHealth, RenderEffects, RenderMana } from "./RenderElements";

function RenderPerson({ character }) {
  return (
    <div id="character-brief" className="w-screen">
      <p className="text-7xl mt-8">{character.emoji}</p>
      <h3>{character.name}</h3>
      {RenderHealth(character.health, character.maxHealth)}
      {RenderMana(character.mana, character.maxMana)}
    </div>
  );
}

export default function RenderCharacter({ character }) {
  var effectDivClassName = "1vh flex px-1 text-pink-600";
  if (character?.effect?.length > 0) {
    effectDivClassName = "0px flex px-1 text-pink-600";
  }
  return (
    <div
      id="character-full"
      className="text-center flex flex-col justify-center items-center flex-wrap"
    >
      <RenderPerson character={character} />
      <div className={effectDivClassName}>
        {character.effects.length > 0 && RenderEffects(character)}
      </div>
    </div>
  );
}
