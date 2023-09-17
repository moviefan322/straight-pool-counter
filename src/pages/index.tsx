export default function Home() {
  return (
    <>
      <div className="scorebox">
        <div className="playerbox">
          <div className="name">
            <p> Player 1</p>
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
    </>
  );
}
