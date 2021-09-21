import React from "react";
import { RenderHealth, RenderEffects, RenderMana } from "./RenderElements";

function RenderPerson({ character }) {
  return (
    <div id="character-brief">
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
      id="character-full"
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RenderPerson character={character} />
      <div
        style={{
          paddingLeft: "1vw",
          paddingRight: "1vw",
          backgroundColor: "#8E3A56",
        }}
      >
        {character.effects.length > 0 && RenderEffects(character)}
      </div>
    </div>
  );
}
