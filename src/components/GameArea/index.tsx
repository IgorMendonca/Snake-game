
import './styles.css'

const GameArea = ({children}: any) => {
  return (
    <>
      <div className='game-area'>
        {children}
      </div>
    </>
  )
}

export default GameArea