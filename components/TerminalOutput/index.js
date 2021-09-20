import React, { useEffect, useState } from "react";
import RenderEnemies from "./ui/RenderEnemies";
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
    <div id="terminal-output">
      <RenderEnemies enemies={enemies} />
      <ul
        id="history"
        style={{
          alignSelf: "flex-end",
          backgroundColor: "#012456",
          color: "#A2A9B4",
          height: "30vh",
          paddingTop: "1vh",
          listStyle: "none",
          paddingLeft: "2vw",
        }}
      >
        {showWelcome && <li key="welcome-message">{welcomeMessage}</li>}
        {historyMapping.length > 0 && historyMapping}
        <TerminalInput
          history={history}
          updateHistory={updateHistory}
          character={character}
          updateCharacter={updateCharacter}
          enemies={enemies}
          updateEnemies={updateEnemies}
        />
      </ul>
    </div>
  );
}

export default TerminalOutput;
