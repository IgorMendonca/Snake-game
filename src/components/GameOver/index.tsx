
import './styles.css'

interface gameOverProps {
  onPlayAgain: () => void
}

const GameOver = (props: gameOverProps) => {
  return (
    <div className='game-over'>
      <h1>
        GAME OVER
      </h1>
      <button 
        className='play-again'
        onClick={props.onPlayAgain}
      >
        PLAY AGAIN
      </button>
    </div>
  )
}

export default GameOver