import { useState } from "react";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";

export default function Home() {
  const [score, setScore] = useState(0);
  const [score2, setScore2] = useState(0);
  const [scoreRack, setScoreRack] = useState(0);
  const [scoreRack2, setScoreRack2] = useState(0);
  const [name, setName] = useState("Player 1");
  const [name2, setName2] = useState("Player 2");
  const [rackRem, setRackRem] = useState(15);
  const [editName1, setEditName1] = useState(false);
  const [editName2, setEditName2] = useState(false);

  const toggleEdit = () => {
    setEditName1(!editName1);
    console.log(editName1);
  };

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const toggleEdit2 = () => {
    setEditName2(!editName2);
  };

  const nameChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName2(e.target.value);
  };


  console.log(editName1);

  return (
    <>
      <div className="scorebox">
        <div className="playerbox">
          <div className="name">
            {!editName1 ? (
              <p>{name} </p>
            ) : (
              <input
                className=""
                value={name}
                type="text"
                onChange={(e) => nameChange(e)}
              />
            )}

            <button onClick={() => toggleEdit()} className="edit no-style-but">
              {!editName1 ? <AiFillEdit /> : <AiOutlineCheck />}
            </button>
          </div>
          <div className="scoreTotal">{score}</div>
          <div className="bottom">
            <div className="buttons">
              <button className="plus">+</button>
              <button className="minus">-</button>
            </div>
            <div className="scoreRack">
              <p>{scoreRack}</p>
            </div>
          </div>
        </div>
        <div className="playerbox">
        <div className="name">
            {!editName2 ? (
              <p>{name2} </p>
            ) : (
              <input
                className=""
                value={name2}
                type="text"
                onChange={(e) => nameChange2(e)}
              />
            )}

            <button onClick={() => toggleEdit2()} className="edit no-style-but">
              {!editName2 ? <AiFillEdit /> : <AiOutlineCheck />}
            </button>
          </div>
          <div className="scoreTotal">{score2}</div>
          <div className="bottom">
            <div className="scoreRack">
              <p>{scoreRack2}</p>
            </div>
            <div className="buttons2">
              <button className="plus">+</button>
              <button className="minus">-</button>
            </div>
          </div>
        </div>
      </div>
      <div className="rackrem">
        <p>Remaining in Rack: {rackRem}</p>
      </div>
    </>
  );
}
