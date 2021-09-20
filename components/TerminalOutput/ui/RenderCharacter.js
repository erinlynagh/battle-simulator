import React from "react";
import { RenderHealth } from "./RenderElements";

function RenderEnemy({ character }) {
  return (
    <div>
      <p style={{ fontSize: "5em", margin: "0px" }}>{character.emoji}</p>
      <h3 style={{ marginTop: "-10px" }}>{character.name}</h3>
      {RenderHealth(character.health, character.maxHealth)}
    </div>
  );
}

export default function RenderCharacter({ character }) {
  return (
    <div
      style={{
        alignSelf: "flex-start",
        textAlign: "center",
      }}
    >
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <RenderEnemy character={character} />
      </div>
    </div>
  );
}
