import React, { useEffect, useState } from "react";
import RenderEnemies from "./ui/RenderEnemies";
import RenderCharacter from "./ui/RenderCharacter";
import TerminalInput from "../TerminalInput";
function TerminalOutput(props) {
  const {
    history,
    updateHistory,
    character,
    updateCharacter,
    enemies,
    updateEnemies,
  } = props;

  const historyMapping = history.map((historyItem, index) => (
    <li key={index}>{historyItem}</li>
  ));

  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (showWelcome && history.length > 0) {
      setShowWelcome(false);
    }
  }, [history]);

  const welcomeMessage = `❯ ${character.name}, Welcome to the Dungeon`;

  return (
    <div id="terminal-output" style={{ height: "100%" }}>
      <RenderEnemies enemies={enemies} />
      <RenderCharacter character={character} />
      <div
        style={{
          flex: "1",
          backgroundColor: "#012456",
          color: "#A2A9B4",
          height: "100%",
        }}
      >
        <TerminalInput
          history={history}
          updateHistory={updateHistory}
          character={character}
          updateCharacter={updateCharacter}
          enemies={enemies}
          updateEnemies={updateEnemies}
        />
      </div>
    </div>
  );
}

export default TerminalOutput;
