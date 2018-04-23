import React from 'react';

const Guide = (props) => {
  return (
    <div {...props}>
      <div className="d-flex">
        <table>
          <tbody>
          <tr>
            <td className="label">Controls</td>
            <td>
              <div className="d-flex justify-content-center">
                <div className="button1">W</div>
              </div>
              <div className="d-flex">
                <div className="button1">A</div>
                <div className="button1">S</div>
                <div className="button1">D</div>
              </div>
            </td>
          </tr>

          <tr>
            <td className="label">Pause/Resume</td>
            <td>
              <div className="button1">Space</div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Guide;
