import React from "react";
import UnityWrapper from "../../components/UnityWrapper";

function BallBreaker() {
  const unityContext = {
    loaderUrl: "/unity_games/ball_breaker/Build/v1.loader.js",
    dataUrl: "/unity_games/ball_breaker/Build/v1.data",
    frameworkUrl: "/unity_games/ball_breaker/Build/v1.framework.js",
    codeUrl: "/unity_games/ball_breaker/Build/v1.wasm",
  };

  return (
    <div>
      <div>Di chuyển: Giữ chuột trái</div>
      <UnityWrapper unityContext={unityContext} portrait />
    </div>
  )
}

export default BallBreaker;
