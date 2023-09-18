/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";

export default function Home() {
  const [rackNo, setRackNo] = useState(1);
  const [firstShot, setFirstShot] = useState(true);
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
  const [showModal2, setShowModal2] = useState(false);
  const [player1Shooting, setPlayer1Shooting] = useState(true);
  const [scoreStyle, setScoreStyle] = useState("rgb(6, 126, 254)");
  const [scoreStyle2, setScoreStyle2] = useState("black");
  const [currentRun, setCurrentRun] = useState(0);
  const [highRun, setHighRun] = useState({ run: 0, player: "" });
  const [consecutiveFoul, setConsecutiveFoul] = useState({
    player1: 0,
    player2: 0,
  });
  const [prevState, setPrevState] = useState({
    prevScore: 0,
    prevScore2: 0,
    prevScoreRack: 0,
    prevScoreRack2: 0,
    prevRackRem: 15,
    prevPlayer1Shooting: true,
    prevCurrentRun: 0,
    prevHighRun: { run: 0, player: "" },
  });

  const fifteen = scoreRack2 + scoreRack === 14;

  const savePrevState = () => {
    setPrevState({
      prevScore: score,
      prevScore2: score2,
      prevScoreRack: scoreRack,
      prevScoreRack2: scoreRack2,
      prevRackRem: rackRem,
      prevPlayer1Shooting: player1Shooting,
      prevCurrentRun: currentRun,
      prevHighRun: highRun,
    });
  };

  useEffect(() => {
    if (consecutiveFoul.player1 === 3) {
      savePrevState();
      setScore(score - 15);
      setPlayer1Shooting(false);
      setConsecutiveFoul({ player1: 0, player2: consecutiveFoul.player2 });
    }
    if (consecutiveFoul.player2 === 3) {
      savePrevState();
      setScore2(score2 - 15);
      setPlayer1Shooting(true);
      setConsecutiveFoul({ player1: consecutiveFoul.player1, player2: 0 });
    }
  }, [consecutiveFoul, score, score2, prevState, setScore, setScore2]);

  const restorePrevState = () => {
    setScore(prevState.prevScore);
    setScore2(prevState.prevScore2);
    setScoreRack(prevState.prevScoreRack);
    setScoreRack2(prevState.prevScoreRack2);
    setRackRem(prevState.prevRackRem);
    setPlayer1Shooting(prevState.prevPlayer1Shooting);
    setCurrentRun(prevState.prevCurrentRun);
    setHighRun(prevState.prevHighRun);
  };

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
    savePrevState();
    setScore(score + 1);
    setScoreRack(scoreRack + 1);
    setRackRem(rackRem - 1);
    setCurrentRun(currentRun + 1);
  };

  const decrementScore1 = () => {
    savePrevState();
    setScore(score - 1);
    setScoreRack(scoreRack - 1);
    setRackRem(rackRem + 1);
    setCurrentRun(currentRun - 1);
  };

  const toggleEdit2 = () => {
    setEditName2(!editName2);
  };

  const nameChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName2(e.target.value);
  };

  const incrementScore2 = () => {
    savePrevState();
    setScore2(score2 + 1);
    setScoreRack2(scoreRack2 + 1);
    setRackRem(rackRem - 1);
    setCurrentRun(currentRun + 1);
  };

  const decrementScore2 = () => {
    savePrevState();
    setScore2(score2 - 1);
    setScoreRack2(scoreRack2 - 1);
    setRackRem(rackRem + 1);
    setCurrentRun(currentRun - 1);
  };

  const rerack = (ballsRemaining: number) => {
    savePrevState();
    if (rackNo === 1) {
      if (player1Shooting) {
        setScore(15 - ballsRemaining - scoreRack2);
        setCurrentRun(currentRun + (15 - ballsRemaining - scoreRack2));
      } else {
        setScore2(15 - ballsRemaining - scoreRack);
        setCurrentRun(currentRun + (15 - ballsRemaining - scoreRack));
      }
    } else {
      if (player1Shooting) {
        setScore(score + (15 - ballsRemaining - scoreRack2));
        setCurrentRun(currentRun + (15 - ballsRemaining - scoreRack2));
      } else {
        setScore2(score2 + (15 - ballsRemaining - scoreRack));
        setCurrentRun(currentRun + (15 - ballsRemaining - scoreRack));
      }
    }
    toggleModal();
    setRackRem(15);
    setRackNo(rackNo + 1);
    setScoreRack(0);
    setScoreRack2(0);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    console.log(showModal);
  };

  const handleFoul = (amt = 1) => {
    savePrevState();
    setShowModal2(false);
    if (firstShot) {
      setFirstShot(false);
      setShowModal2(true);
      return;
    }

    if (player1Shooting) {
      setScore(score - amt);
      setPlayer1Shooting(false);
      setConsecutiveFoul({
        player1: consecutiveFoul.player1 + 1,
        player2: consecutiveFoul.player2,
      });
    } else {
      setScore2(score2 - amt);
      setPlayer1Shooting(true);
      setConsecutiveFoul({
        player1: consecutiveFoul.player1,
        player2: consecutiveFoul.player2 + 1,
      });
    }
  };

  const switchPlayer = () => {
    savePrevState();
    setPlayer1Shooting(!player1Shooting);
    if (currentRun > highRun.run) {
      if (player1Shooting) {
        setHighRun({ run: currentRun, player: name });
      } else {
        setHighRun({ run: currentRun, player: name2 });
      }
    }
    setCurrentRun(0);
  };

  const handleNewGame = () => {
    savePrevState();
    setScore(0);
    setScore2(0);
    setScoreRack(0);
    setScoreRack2(0);
    setRackNo(1);
    setRackRem(15);
    setPlayer1Shooting(true);
    setCurrentRun(0);
    setHighRun({ run: 0, player: "" });
  };

  return (
    <>
      <div className="header">
        <h2>14.1 Scorecard</h2>
      </div>
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
      <div
        className="rackrem"
        style={highRun.run === 0 ? { display: "none" } : {}}
      >
        <p>
          High Run: {highRun.run} ({highRun.player})
        </p>
      </div>
      <div className="rackrem">
        <p>Current Run: {currentRun}</p>
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
          onClick={() => switchPlayer()}
        >
          Miss
        </button>
      </div>
      <div className="buttonRow">
        <button
          className="no-style-but custom-but"
          onClick={() => switchPlayer()}
        >
          Safety
        </button>
        <button
          className="no-style-but custom-but"
          onClick={() => handleFoul()}
        >
          Foul
        </button>
      </div>
      <div className="buttonRow">
        <button
          className="no-style-but custom-but"
          onClick={() => handleNewGame()}
        >
          New Game
        </button>
        <button
          className="no-style-but custom-but"
          onClick={() => restorePrevState()}
        >
          Undo
        </button>
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

      {showModal2 && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <button
                className="no-style-but custom-but"
                onClick={() => handleFoul(2)}
              >
                Illegal Break
              </button>
              <button
                className="no-style-but custom-but"
                onClick={() => handleFoul()}
              >
                Standard Foul
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
