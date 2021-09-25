import React from "react";
import dynamic from "next/dynamic";
import { getEffectToolTip } from "../../library/classes";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

function RenderMoveLog({ enemyAttacks, enemies }) {
  let className = "text-red-700";
  if (Array.isArray(enemyAttacks) && enemyAttacks.length > 0) {
    className += " mb-1";
  }
  return (
    <div id="enemy-moves" className={className}>
      {enemyAttacks.map((attack, index) => {
        var enemy = enemies.find(({ id }) => id === attack.id);
        if (enemy === undefined) {
          return;
        }
        return (
          <React.Fragment key={index}>
            <span data-tip={tooltip()} className="block text-center">
              {attack.attackMessage && !attack.spoof
                ? "> " + enemy.name + " attacks with " + attack.attackMessage
                : attack.attackMessage}
              <ReactTooltip html={true} />
            </span>
          </React.Fragment>
        );

        function tooltip() {
          if (attack?.effect && getEffectToolTip(attack.effect)) {
            return attack.effect.getTooltip();
          } else {
            return "";
          }
        }
      })}
    </div>
  );
}

export default RenderMoveLog;
