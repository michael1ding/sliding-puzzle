import React from "react";
import { Motion, spring } from "react-motion";
import { getMatrixPosition, getVisualPosition } from "./game-logic";

const size = 3;
const board_pixels = 400;

function Tile(props) {
  const { tile, index, width, height, handleTileClick } = props;
  const { row, col } = getMatrixPosition(index);
  const visualPos = getVisualPosition(row, col, width, height);
  const tileStyle = {
    width: `calc(100% / ${size})`,
    height: `calc(100% / ${size})`,
    translateX: visualPos.x,
    translateY: visualPos.y,
    backgroundSize: `${board_pixels * 1.25}px`,
    backgroundPosition: `${(100 / size) * (tile % size)}% ${(100 / size) * (Math.floor(tile / size))}%`,

  };
  const motionStyle = {
    translateX: spring(visualPos.x),
    translateY: spring(visualPos.y)
  }

  return (
    <Motion style={motionStyle}>
      {({ translateX, translateY }) => (
        <li
          style={{
            ...tileStyle,
            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            opacity: tile !== 8 ? 1 : 0,
          }}
          className="tile"
          onClick={() => handleTileClick(index)}
        >
          {`${tile + 1}`}
        </li>
      )}
    </Motion>
  );
}

export default Tile;