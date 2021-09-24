import React from "react";
import {
  RenderHealth,
  RenderEffects,
  getAttackTooltip,
} from "./RenderElements";
import dynamic from "next/dynamic";
import { shake, pulse, wobble } from "react-animations";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  shake: {
    animationName: shake,
    animationDuration: "1s",
  },
  pulse: {
    animationName: pulse,
    animationDuration: "1s",
  },
  wobble: {
    animationName: wobble,
    animationDuration: "1s",
  },
});

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

function RenderAttack(attack, attackIndex) {
  return (
    <React.Fragment key={attackIndex}>
      <p
        className="text-yellow-300 m-0 underline"
        data-tip={attack.getTooltip()}
      >
        {attack.name}
      </p>
      <ReactTooltip html={true} />
    </React.Fragment>
  );
}

function RenderAttacks(enemy) {
  return (
    <div className="m-0">
      <p className={"flex flex-col justify-center m-0"}>Attacks:</p>
      {enemy.attacks.map((attack, attackIndex) =>
        RenderAttack(attack, attackIndex)
      )}
    </div>
  );
}

function RenderEnemy({ enemy }) {
  console.log(enemy);
  if (enemy.animate) {
    return (
      <div
        className={
          "border-red-300 p-2 border-2 mb-1 " + css(styles[[enemy.animate]])
        }
      >
        <p className="mt-2 text-7xl">{enemy.emoji}</p>
        <h3>{enemy.name}</h3>
        {RenderHealth(enemy.health, enemy.maxHealth)}
        {RenderAttacks(enemy)}
        {enemy.effects.length > 0 && RenderEffects(enemy)}
      </div>
    );
  }
  return (
    <div className="border-red-300 p-2 border-2 mb-1">
      <p className="mt-2 text-7xl">{enemy.emoji}</p>
      <h3>{enemy.name}</h3>
      {RenderHealth(enemy.health, enemy.maxHealth)}
      {RenderAttacks(enemy)}
      {enemy.effects.length > 0 && RenderEffects(enemy)}
    </div>
  );
}

export default function RenderEnemies({ enemies }) {
  return (
    <div id="enemies" className="align-self-center text-center">
      <div className="flex flex-row justify-around">
        {Array.isArray(enemies) ? (
          enemies.map((enemy, index) => {
            return <RenderEnemy key={index} enemy={enemy} />;
          })
        ) : (
          <div>
            <h1>You Win!</h1>
            <button className="btn" onClick={() => window.location.reload()}>
              Reload
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
