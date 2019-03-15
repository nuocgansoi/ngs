import React from 'react';

export default (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="259 1152 640 208"
    className="logo"
    {...props}
    dangerouslySetInnerHTML={{
      __html: `
      <defs>
        <style>
          .cls-1 {
          fill: rgba(255,255,255,0);
        }

          .cls-2 {
          fill: none;
        }

          .cls-3 {
          fill: rgba(254,241,125,0);
        }
        </style>
        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#63a53c"/>
          <stop offset="0.46" stop-color="#1c8758"/>
          <stop offset="1" stop-color="#024833"/>
        </linearGradient>
      </defs>
      <g id="logo" transform="translate(-104 872)">
        <g id="S" transform="translate(-146 -24)">
          <rect id="Rectangle_88" data-name="Rectangle 88" class="cls-1" width="208" height="208" transform="translate(941 304)"/>
          <path stroke="#5ff17efa" stroke-width="10" id="Union_1" data-name="Union 1" class="cls-2" d="M446.991-921.019h0l-9.765-13.946,0,0L417.85-962.646l9.766-13.947L447-948.917,500.269-1025H374v-.269l-31.387-44.826,1.8-1.26,38.931-55.6V-1129H515.379l-11.3,16H393.105l-30.5,43.56L382.518-1041H531L456.761-934.97v0L447-921.021v0l0,0,0,0h0Zm0,0h0Z" transform="translate(608.387 1433)"/>
        </g>
        <g id="G" transform="translate(260 250)">
          <path stroke="#5ff17efa" stroke-width="10"  id="Union_2" data-name="Union 2" class="cls-2" d="M32-914v-4H-136v4h-16v-4h-4v-16h4v-168h-4v-16h4v-4h16v4H32v-4H48v4h4v16H48v4H32v-4H-136v168H32v-72H-32v23H-48v-23h-4v-16h4v-4h16v4H32v-4H48v4h4v16H48v72h4v16H48v4Z" transform="translate(482.999 1152)"/>
        </g>
        <g id="N" transform="translate(296 -107)">
          <rect id="Rectangle_53" data-name="Rectangle 53" class="cls-3" width="208" height="208" transform="translate(67 387)"/>
          <path stroke="#5ff17efa" stroke-width="10"  id="Union_1-2" data-name="Union 1" class="cls-2" d="M-57.237-561.3H-176.925l-2.467,3.157L-192-568-98.39-687.812-151-755.15l12.608-9.85,2.888,3.7h94.532l2.888-3.7,12.608,9.85-52.61,67.338L-30.805-627.3,1.9-686.3,15.9-678.547l-36,64.949L15.523-568l-12.608,9.85L-28.531-598.4-51.006-557.85Zm-1.279-16,19.284-34.789-49.006-62.725L-164.424-577.3Zm-29.722-123.5,34.765-44.5H-123Z" transform="translate(259 1152.304)"/>
        </g>
      </g>
      `,
    }}
  />
);
