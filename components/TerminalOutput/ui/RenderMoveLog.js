import React from "react";
import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

function RenderMoveLog({ enemyAttacks, enemies }) {
  return (
    <div id="enemy-moves">
      {enemyAttacks.map((attack, index) => {
        console.log(index);
        console.log(enemies[index]);
        return (
          <React.Fragment key={index}>
            <span
              data-tip={attack.effect.getTooltip()}
              style={{ display: "block" }}
            >
              {enemies[index].name + " attacks with " + attack.attackMessage}
              <ReactTooltip html={true} />
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default RenderMoveLog;
