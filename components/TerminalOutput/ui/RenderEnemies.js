import React from "react";
import { RenderHealth, RenderEffects } from "./RenderElements";
import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

function RenderAttacksHeader() {
  return (
    <>
      <p
        style={{
          margin: "1px",
          marginBottom: "3px",
          gridColumn: "1 / span 1",
        }}
      >
        Name
        <br />
      </p>
      <p
        style={{
          margin: "1px",
          marginLeft: "5vw",
          gridColumn: "2 / span 1",
        }}
      >
        Power
        <br />
      </p>
      <p
        style={{
          margin: "1px",
          marginLeft: "5vw",
          gridColumn: "3 / span 1",
        }}
      >
        Effect
        <br />
      </p>
    </>
  );
}

function RenderAttack(attack, attackIndex) {
  return (
    <React.Fragment key={attackIndex}>
      <p
        style={{
          margin: "1px",
        }}
      >
        {attack.name}
      </p>
      <p
        style={{
          margin: "1px",
          marginLeft: "5vw",
        }}
      >
        {attack.power}
      </p>
      <p
        style={{
          margin: "1px",
          marginLeft: "5vw",
        }}
        data-tip={
          attack.effect.duration === 2
            ? attack.effect.description
                .replace("BLANK", attack.effect.duration - 1)
                .replace("turns", "turn")
            : attack.effect.description.replace(
                "BLANK",
                attack.effect.duration - 1
              )
        }
      >
        {attack.effect.name}
      </p>
      <ReactTooltip html={true} />
    </React.Fragment>
  );
}

function RenderAttacks(enemy) {
  return (
    <div
      style={{
        flexDirection: "column",
        display: "flex",
        color: "#A2A9B4",
        backgroundColor: "#8E3A56",
      }}
    >
      <div
        style={{
          display: "grid",
          gridAutoColumns: "auto",
          gridAutoRows: "auto",
          textAlign: "left",
        }}
      >
        <RenderAttacksHeader />
        {enemy.attacks.map((attack, attackIndex) =>
          RenderAttack(attack, attackIndex)
        )}
      </div>
    </div>
  );
}

function RenderEnemy({ enemy }) {
  return (
    <div>
      <p style={{ fontSize: "5em", margin: "0px" }}>{enemy.emoji}</p>
      <h3 style={{ marginTop: "-10px" }}>{enemy.name}</h3>
      {RenderHealth(enemy.health, enemy.maxHealth)}
      <h4
        style={{
          color: "#A2A9B4",
          backgroundColor: "#8E3A56",
          padding: ".75em",
          marginBottom: "0px",
        }}
      >
        Attacks
      </h4>
      {RenderAttacks(enemy)}
      {enemy.effects.length > 0 && RenderEffects(enemy)}
    </div>
  );
}

export default function RenderEnemies({ enemies }) {
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
        {enemies.map((enemy, index) => {
          return (
            <React.Fragment key={index}>
              <RenderEnemy enemy={enemy} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
