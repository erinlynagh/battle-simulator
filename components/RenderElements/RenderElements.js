import React from "react";
import dynamic from "next/dynamic";
import { getAttackTooltip, getEffectToolTip } from "../../library/classes";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

export function RenderHealth(health, maxHealth) {
  var className = "text-green-500";
  if (health / maxHealth <= 0.5) {
    className = "text-yellow-300";
  }
  if (health / maxHealth <= 0.25) {
    className = "text-red-700";
  }
  return (
    <h4 className={className}>
      Health: {health}/{maxHealth}
    </h4>
  );
}

export function RenderMana(mana, maxMana) {
  let color = "text-blue-600";
  if (mana === 1) {
    color = "text-blue-300";
  }
  if (mana === 0) {
    color = "text-yellow-300";
  }
  return (
    <h4 className={color}>
      Mana: {mana}/{maxMana}
    </h4>
  );
}

export function RenderCasts(character, attackIndex) {
  if (attackIndex < 0) {
    return null;
  }
  let casts = character.attacks[attackIndex].casts;
  var className = "text-green-700";
  if (casts <= 2) {
    className = "text-indigo-500";
  }
  if (casts <= 1) {
    className = "text-indigo-300 text-opacity-25";
  }
  return <h4 className={className}>Casts Remaining: {casts}</h4>;
}

export function RenderEffects(enemy) {
  function RenderEffect(effect, effectIndex) {
    if (effect.name === "None") {
      return;
    }
    if (effect.name === "Doctored") {
      return (
        <React.Fragment key={effectIndex}>
          <p className="text-center" data-tip={getEffectToolTip(effect)}>
            {`${effect.displayName}: ${effect.duration}`}
          </p>
          <ReactTooltip html={true} />
        </React.Fragment>
      );
    }
    if (effect.name === "IncreaseMana") {
      return (
        <React.Fragment key={effectIndex}>
          <p className="text-center" data-tip={getEffectToolTip(effect)}>
            {`${effect.displayName} by 1`}
          </p>
          <ReactTooltip html={true} />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment key={effectIndex}>
        <p className="text-center" data-tip={getEffectToolTip(effect)}>
          {`${effect.displayName}: ${effect.duration} turns`}
        </p>
        <ReactTooltip html={true} />
      </React.Fragment>
    );
  }
  return (
    <div className="text-pink-600">
      <div className="grid auto-rows-auto auto-columns-auto">
        {enemy.effects.map((effect, effectIndex) =>
          RenderEffect(effect, effectIndex)
        )}
      </div>
    </div>
  );
}

export function RenderAttacks(character) {
  return (
    <div className="m-0">
      <p className={"flex flex-col justify-center m-0"}>Attacks:</p>
      {character.attacks.map((attack, attackIndex) =>
        RenderAttack(attack, attackIndex)
      )}
    </div>
  );
}

export function RenderAttack(attack, attackIndex) {
  return (
    <React.Fragment key={attackIndex}>
      <p data-tip={getAttackTooltip(attack)}>
        <span className="text-yellow-300 m-0 underline ">
          {attack.displayName}
        </span>
        {attack.constructor.name === "Attack" && (
          <span className="text-gray-300 no-underline">
            {" "}
            (Casts: {attack.casts})
          </span>
        )}
      </p>
      <ReactTooltip html={true} />
    </React.Fragment>
  );
}
