import React, { useEffect } from "react";
import { shake, pulse, wobble } from "react-animations";
import { StyleSheet, css } from "aphrodite";

import { RenderHealth, RenderEffects, RenderAttacks } from "./RenderElements";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

function RenderEnemy({
  index,
  enemy,
  targetedEnemyIndex,
  setTargetedEnemyIndex,
}) {
  const className =
    "p-2 mb-1 border-2 border-black hover:bg-gray-800 " +
    css(styles[[enemy.animate]]);
  const selectedClass =
    targetedEnemyIndex === index ? " border-green-600 bg-gray-800" : "";
  return (
    <div
      key={index}
      className={className + selectedClass}
      onClick={() => handleTargetedEnemyIndex(index)}
    >
      <p className="mt-2 text-7xl">{enemy.emoji}</p>
      <h3>{enemy.name}</h3>
      {RenderHealth(enemy.health, enemy.maxHealth)}
      {RenderAttacks(enemy)}
      {enemy.effects.length > 0 && RenderEffects(enemy)}
    </div>
  );

  function handleTargetedEnemyIndex(index) {
    if (targetedEnemyIndex === index) {
      setTargetedEnemyIndex(-1);
    } else {
      setTargetedEnemyIndex(index);
    }
  }
}

export default function RenderEnemies({
  enemies,
  targetedEnemyIndex,
  setTargetedEnemyIndex,
  setShowSelectHelper,
}) {
  useEffect(() => {
    if (targetedEnemyIndex !== -1) {
      setShowSelectHelper(false);
    }
  }, [targetedEnemyIndex]);
  return (
    <div id="enemies" className="align-self-center text-center">
      <div className="flex flex-row justify-around">
        {Array.isArray(enemies) &&
          enemies.map((enemy, index) => {
            return (
              <RenderEnemy
                index={index}
                key={index}
                enemy={enemy}
                targetedEnemyIndex={targetedEnemyIndex}
                setTargetedEnemyIndex={setTargetedEnemyIndex}
              />
            );
          })}
      </div>
    </div>
  );
}
