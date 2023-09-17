import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";

export default function Home() {
  const [score, setScore] = useState(0);
  const [score2, setScore2] = useState(0);
  const [scoreRack, setScoreRack] = useState(0);
  const [scoreRack2, setScoreRack2] = useState(0);
  const [name, setName] = useState("Player 1");
  const [name2, setName2] = useState("Player 2");

  return (
    <>
      <div className="scorebox">
        <div className="playerbox">
          <div className="name">
            <p>{name} </p>
            <p className="edit">
              <AiFillEdit />
            </p>
          </div>
          <div className="scoreTotal">10</div>
          <div className="bottom">
            <div className="buttons">
              <button className="plus">+</button>
              <button className="minus">-</button>
            </div>
            <div className="scoreRack">
              <p>6</p>
            </div>
          </div>
        </div>
        <div className="playerbox">
          <div className="name">
            <p>Player 2</p>
          </div>
          <div className="scoreTotal">10</div>
          <div className="bottom">
            <div className="scoreRack">
              <p>6</p>
            </div>
            <div className="buttons2">
              <button className="plus">+</button>
              <button className="minus">-</button>
            </div>
          </div>
        </div>
      </div>
      <div className="rackrem">
        <p>Remaining in Rack: 0</p>
      </div>
    </>
  );
}
