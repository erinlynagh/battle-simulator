import React from "react";
import { RenderHealth, RenderEffects, RenderMana } from "./RenderElements";

function RenderEnemy({ character }) {
  return (
    <div>
      <p style={{ fontSize: "5em", margin: "0px" }}>{character.emoji}</p>
      <h3 style={{ marginTop: "-10px" }}>{character.name}</h3>
      {RenderHealth(character.health, character.maxHealth)}
      {RenderMana(character.mana, character.maxMana)}
    </div>
  );
}

export default function RenderCharacter({ character }) {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <RenderEnemy character={character} />
      {character.effects.length > 0 && RenderEffects(character)}
    </div>
  );
}
