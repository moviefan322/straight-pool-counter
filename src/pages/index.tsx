import { useEffect, useState } from "react";
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
  const [showModal, setShowModal] = useState(false);
  const [player1Shooting, setPlayer1Shooting] = useState(true);
  const [scoreStyle, setScoreStyle] = useState("rgb(6, 126, 254)");
  const [scoreStyle2, setScoreStyle2] = useState("black");

  useEffect(() => {
    if (player1Shooting) {
      setScoreStyle("rgb(6, 126, 254)");
      setScoreStyle2("black");
    } else {
      setScoreStyle("black");
      setScoreStyle2("rgb(6, 126, 254)");
    }
  }, [player1Shooting, scoreStyle, scoreStyle2]);

  const toggleEdit = () => {
    setEditName1(!editName1);
    console.log(editName1);
  };

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const incrementScore1 = () => {
    setScore(score + 1);
    setScoreRack(scoreRack + 1);
    setRackRem(rackRem - 1);
  };

  const decrementScore1 = () => {
    setScore(score - 1);
    setScoreRack(scoreRack - 1);
    setRackRem(rackRem + 1);
  };

  const toggleEdit2 = () => {
    setEditName2(!editName2);
  };

  const nameChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName2(e.target.value);
  };

  const incrementScore2 = () => {
    setScore2(score2 + 1);
    setScoreRack2(scoreRack2 + 1);
    setRackRem(rackRem - 1);
  };

  const decrementScore2 = () => {
    setScore2(score2 - 1);
    setScoreRack2(scoreRack2 - 1);
    setRackRem(rackRem + 1);
  };

  const rerack = (ballsRemaining: number) => {
    toggleModal();
    setRackRem(15);
    setScoreRack(0);
    setScoreRack2(0);
    if (score !== scoreRack) setScore((score) => score + scoreRack);
    if (score2 !== scoreRack2) setScore2((score) => score + scoreRack2);
    if (ballsRemaining === 0) {
      if (player1Shooting) {
        setScore(score + 1);
      } else {
        setScore2(score + 1);
      }
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    console.log(showModal);
  };

  const fifteen = scoreRack2 + scoreRack === 14;

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
          <div className="scoreTotal" style={{ backgroundColor: scoreStyle }}>
            {score}
          </div>
          <div className="bottom">
            <div className="buttons">
              <button
                className="plus"
                onClick={() => incrementScore1()}
                disabled={fifteen || !player1Shooting}
              >
                +
              </button>
              <button
                className="minus"
                onClick={() => decrementScore1()}
                disabled={scoreRack === 0 || !player1Shooting}
              >
                -
              </button>
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
          <div className="scoreTotal" style={{ backgroundColor: scoreStyle2 }}>
            {score2}
          </div>
          <div className="bottom">
            <div className="scoreRack2">
              <p>{scoreRack2}</p>
            </div>
            <div className="buttons">
              <button
                className="plus"
                onClick={() => incrementScore2()}
                disabled={fifteen || player1Shooting}
              >
                +
              </button>
              <button
                className="minus"
                onClick={() => decrementScore2()}
                disabled={scoreRack2 === 0 || player1Shooting}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="rackrem">
        <p>Remaining in Rack: {rackRem}</p>
      </div>
      <div className="buttonRow">
        <button
          className="no-style-but custom-but"
          onClick={() => toggleModal()}
        >
          Rerack
        </button>
        <button
          className="no-style-but custom-but"
          onClick={() => setPlayer1Shooting(!player1Shooting)}
        >
          Miss
        </button>
      </div>
      <div className="buttonRow">
        <button className="no-style-but custom-but">X</button>
        <button className="no-style-but custom-but">X</button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>How many balls left?</h2>
              <button className="close-button" onClick={() => toggleModal()}>
                ×
              </button>
            </div>
            <div className="modal-content">
              <button
                className="no-style-but custom-but"
                onClick={() => rerack(1)}
              >
                1
              </button>
              <button
                className="no-style-but custom-but"
                onClick={() => rerack(0)}
              >
                0
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
