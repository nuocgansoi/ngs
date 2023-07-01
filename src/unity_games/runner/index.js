import React from "react";
import UnityWrapper from "../../components/UnityWrapper";

function Runner() {
  const unityContext = {
    loaderUrl: "/unity_games/test_2D_runner/Build/v2.loader.js",
    dataUrl: "/unity_games/test_2D_runner/Build/v2.data",
    frameworkUrl: "/unity_games/test_2D_runner/Build/v2.framework.js",
    codeUrl: "/unity_games/test_2D_runner/Build/v2.wasm",
  };

  return <UnityWrapper unityContext={unityContext} />;
}

export default Runner;
