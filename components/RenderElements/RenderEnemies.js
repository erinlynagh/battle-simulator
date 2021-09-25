import React from "react";
import { shake, pulse, wobble } from "react-animations";
import { StyleSheet, css } from "aphrodite";

import { RenderHealth, RenderEffects, RenderAttacks } from "./RenderElements";

const styles = StyleSheet.create({
  none: {},
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

const classNameEnemy = "p-2 mb-1 ";
const classNameSelectedEnemy = classNameEnemy + "border-green-600 border-2 ";

function RenderEnemy({
  key,
  enemy,
  targetedEnemyIndex,
  setTargetedEnemyIndex,
}) {
  return (
    <div className={classNameSelectedEnemy + css(styles[[enemy.animate]])}>
      <p className="mt-2 text-7xl">{enemy.emoji}</p>
      <h3>{enemy.name}</h3>
      {RenderHealth(enemy.health, enemy.maxHealth)}
      {RenderAttacks(enemy)}
      {enemy.effects.length > 0 && RenderEffects(enemy)}
    </div>
  );
}

export default function RenderEnemies({
  enemies,
  targetedEnemyIndex,
  setTargetedEnemyIndex,
}) {
  return (
    <div id="enemies" className="align-self-center text-center">
      <div className="flex flex-row justify-around">
        {Array.isArray(enemies) ? (
          enemies.map((enemy, index) => {
            return (
              <RenderEnemy
                key={index}
                enemy={enemy}
                targetedEnemyIndex={targetedEnemyIndex}
                setTargetedEnemyIndex={setTargetedEnemyIndex}
              />
            );
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
