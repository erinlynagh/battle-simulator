import React from "react";
import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

function RenderMoveLog({ enemyAttacks, enemies }) {
  let style = { color: "#c50f1f" };
  if (Array.isArray(enemyAttacks) && enemyAttacks.length > 0) {
    style = { color: "#c50f1f", marginBottom: "1vh" };
  }
  return (
    <div id="enemy-moves" style={style}>
      {enemyAttacks.map((attack, index) => {
        console.log(index);
        console.log(enemies[index]);
        return (
          <React.Fragment key={index}>
            <span
              data-tip={attack.effect.getTooltip()}
              style={{ display: "block", textAlign: "center" }}
            >
              {"> " +
                enemies[index].name +
                " attacks with " +
                attack.attackMessage}
              <ReactTooltip html={true} />
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default RenderMoveLog;
