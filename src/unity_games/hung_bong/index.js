import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function HungBong() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/unity_games/test_2D_hung_bong/Build/v2.loader.js",
    dataUrl: "/unity_games/test_2D_hung_bong/Build/v2.data",
    frameworkUrl: "/unity_games/test_2D_hung_bong/Build/v2.framework.js",
    codeUrl: "/unity_games/test_2D_hung_bong/Build/v2.wasm",
  });

  return (
    <div>
      <div>
        {`Phím di chuyển: A D || <- ->`}
      </div>

      <Unity unityProvider={unityProvider} style={{ width: "100%" }} />
    </div>
  );
}

export default HungBong;
