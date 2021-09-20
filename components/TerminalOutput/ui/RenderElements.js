import React from "react";
import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

export function RenderHealth(health, maxHealth) {
  let style = { color: "#13A10E", marginTop: "-1em" };
  if (health / maxHealth <= 0.5) {
    style = { color: "#C19C00", marginTop: "-1em" };
  }
  if (health / maxHealth <= 0.25) {
    style = { color: "#C50F1F", marginTop: "-1em" };
  }
  return (
    <h4 style={style}>
      Health: {health}/{maxHealth}
    </h4>
  );
}

export function RenderMana(mana, maxMana) {
  let style = { color: "#13A10E", marginTop: "-1em" };
  if (mana === 1) {
    style = { color: "#C19C00", marginTop: "-1em" };
  }
  return (
    <h4 style={style}>
      Mana: {mana}/{maxMana}
    </h4>
  );
}

export function RenderEffects(enemy) {
  function RenderEffect(effect, effectIndex) {
    return (
      <React.Fragment key={effectIndex}>
        <p
          style={{
            textAlign: "center",
          }}
          data-tip={effect.getTooltip()}
        >
          {`${effect.name}: ${effect.duration} turns`}
        </p>
        <ReactTooltip html={true} />
      </React.Fragment>
    );
  }
  return (
    <div
      style={{
        flexDirection: "column",
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
        {enemy.effects.map((effect, effectIndex) =>
          RenderEffect(effect, effectIndex)
        )}
      </div>
    </div>
  );
}
