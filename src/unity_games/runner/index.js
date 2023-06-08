import React from "react";
import { useUnityContext } from "react-unity-webgl";
import UnityWrapper from "../../components/UnityWrapper";

function Runner() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/unity_games/test_2D_runner/Build/v2.loader.js",
    dataUrl: "/unity_games/test_2D_runner/Build/v2.data",
    frameworkUrl: "/unity_games/test_2D_runner/Build/v2.framework.js",
    codeUrl: "/unity_games/test_2D_runner/Build/v2.wasm",
  });

  return <UnityWrapper unityProvider={unityProvider} />;
}

export default Runner;
