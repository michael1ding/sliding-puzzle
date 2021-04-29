import React, { useState } from "react";
import Tile from "./tile";
import { canSwap, shuffle, swap } from "./game-logic"
import Button from 'react-bootstrap/Button';


const blocks = 9;
const size = 3;
const width = 400;

function Board() {
  const [tiles, setTiles] = useState([...Array(blocks).keys()]);

  const shuffleTiles = () => {
      console.log("here");
    const shuffledTiles = shuffle(tiles, 8)
    setTiles(shuffledTiles);
  }

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
      setTiles(swappedTiles)
    }
  }

  const handleTileClick = (index) => {
    swapTiles(index)
  }

  const handleShuffleClick = () => {
    shuffleTiles()
  }

  const style = {
    width: width,
    height: width,
  };

  return (
    <>
      <ul style={style} className="board">
        {tiles.map((tile, index) => (
          <Tile
            key={tile}
            index={index}
            tile={tile}
            width={Math.round(width / size)}
            height={Math.round(width / size)}
            handleTileClick={handleTileClick}
          />
        ))}
      </ul>
      {<button onClick={() => handleShuffleClick()}>Shuffle</button>}
    </>
  );
}

export default Board;