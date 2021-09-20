import React from "react";
import { RenderHealth } from "./RenderElements";
import ReactTooltip from "react-tooltip";

const header = "Current Battle";

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

function RenderEffectsHeader() {
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
        Duration
        <br />
      </p>
      <p
        style={{
          margin: "1px",
          marginLeft: "5vw",
          gridColumn: "3 / span 1",
        }}
      >
        Description
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
      >
        {attack.effect.name}
      </p>
    </React.Fragment>
  );
}

function RenderEffect(effect, effectIndex) {
  return (
    <React.Fragment key={effectIndex}>
      <p
        style={{
          margin: "1px",
        }}
      >
        {effect.name}
      </p>
      <p
        style={{
          margin: "1px",
          marginLeft: "5vw",
        }}
      >
        {effect.duration}
      </p>
      <p
        style={{
          margin: "1px",
          marginLeft: "5vw",
        }}
        data-tip={effect.description}
      >
        Hover
      </p>
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

function RenderEffects(enemy) {
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
        <RenderEffectsHeader />
        <ReactTooltip />

        {enemy.effects.map((effect, effectIndex) =>
          RenderEffect(effect, effectIndex)
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
      {enemy.effects.length > 0 && (
        <>
          <h4
            style={{
              color: "#A2A9B4",
              backgroundColor: "#8E3A56",
              padding: ".75em",
              marginBottom: "0px",
            }}
          >
            Effects
          </h4>
          {RenderEffects(enemy)}
        </>
      )}
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
      <h1 key="enemyName">{header}</h1>
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
