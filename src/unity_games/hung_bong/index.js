import React from "react";
import UnityWrapper from "../../components/UnityWrapper";

function HungBong() {
  const unityContext = {
    loaderUrl: "/unity_games/test_2D_hung_bong/Build/v2.loader.js",
    dataUrl: "/unity_games/test_2D_hung_bong/Build/v2.data",
    frameworkUrl: "/unity_games/test_2D_hung_bong/Build/v2.framework.js",
    codeUrl: "/unity_games/test_2D_hung_bong/Build/v2.wasm",
  };

  return (
    <div>
      <div>
        {`Phím di chuyển: A D || <- ->`}
      </div>

      <UnityWrapper unityContext={unityContext}/>
    </div>
  );
}

export default HungBong;
