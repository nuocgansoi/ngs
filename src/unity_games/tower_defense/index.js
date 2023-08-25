import React from "react";
import UnityWrapper from "../../components/UnityWrapper";

function TowerDefense() {
  const unityContext = {
    loaderUrl: "/unity_games/tower_defense/Build/v1.loader.js",
    dataUrl: "/unity_games/tower_defense/Build/v1.data",
    frameworkUrl: "/unity_games/tower_defense/Build/v1.framework.js",
    codeUrl: "/unity_games/tower_defense/Build/v1.wasm",
  };

  return (
    <div>
      <UnityWrapper unityContext={unityContext} />
    </div>
  )
}

export default TowerDefense;
