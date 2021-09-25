import React from "react";
import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

export function RenderHealth(health, maxHealth) {
  var className = "text-green-600";
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
  let color = "text-green-600";
  if (mana === 1) {
    color = "text-yellow-300";
  }
  return (
    <h4 className={color}>
      Mana: {mana}/{maxMana}
    </h4>
  );
}

export function RenderEffects(enemy) {
  function RenderEffect(effect, effectIndex) {
    if (effect.name === "None") {
      return;
    }
    return (
      <React.Fragment key={effectIndex}>
        <p className="text-center" data-tip={effect.getTooltip()}>
          {`${effect.name}: ${effect.duration} turns`}
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

export function RenderAttacks(enemy) {
  return (
    <div className="m-0">
      <p className={"flex flex-col justify-center m-0"}>Attacks:</p>
      {enemy.attacks.map((attack, attackIndex) =>
        RenderAttack(attack, attackIndex)
      )}
    </div>
  );
}

export function RenderAttack(attack, attackIndex) {
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
