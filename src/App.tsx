import { useCallback, useEffect, useState } from "react";
import GameArea from "./components/GameArea";
import GameOver from "./components/GameOver";
import Snake from "./components/Snake";
import SnakeFood from "./components/SnakeFood";

function App() {
  const [
    snakeDots, setSnakeDots
  ] = useState([
    [0,0],
    [2,0]
  ])
  const [direction, setDirection] = useState('R')
  const [changingDirection, setChangingDirection] = useState(false) 
  const [snakeSpeed, setSnakeSpeed] = useState(200)
  const [foodCoordinates, setFoodCoordinates] = useState<number[]>([])
  const [gameOver, setGameOver] = useState(false)

  const getRandomCoordinates = () => {
    const min = 1
    const max = 98
    let x = Math.floor(Math.random() * (max - min) + min)
    let y = Math.floor(Math.random() * (max - min) + min)
    if(x % 2 !== 0) x++
    if(y % 2 !== 0) y++
    setFoodCoordinates([x, y])
  }

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if(changingDirection) {
      return
    }

    if(
      (direction === 'R' && e.key === 'ArrowLeft') ||
      (direction === 'L' && e.key === 'ArrowRight') ||
      (direction === 'D' && e.key === 'ArrowUp') ||
      (direction === 'U' && e.key === 'ArrowDown')
    ) {
      return
    }

    switch(e.key) {
      case 'ArrowRight':
        setDirection((state) => 
          state = 'R'
        );
        break;
      case 'ArrowLeft':
        setDirection((state) => 
          state = 'L'
        );
        break;
      case 'ArrowDown':
        setDirection((state) => 
          state = 'D'
        );
        break;
      case 'ArrowUp':
        setDirection((state) => 
          state = 'U'
        );
        break;
    }

    setChangingDirection(true)
  }, [direction, changingDirection])

  const checkGameOver = useCallback(() => {
    const head = snakeDots[snakeDots.length - 1]
    if(head[0] >= 100 || head[0] < 0 || head[1] >= 100 || head[1] < 0) {
      setGameOver(true)
      return
    }

    snakeDots.forEach((dot, i) => {
      if(i === snakeDots.length - 1) {
        return
      }
      
      if(head.toString() === dot.toString()) {
        setGameOver(true)
        return
      }
    })
  }, [snakeDots])

  const moveSnake = useCallback(() => {
    if(gameOver) {
      return
    }

    const dots = [...snakeDots]
    let head = dots[dots.length - 1]

    switch(direction) {
      case 'R': 
        head = [head[0] + 2, head[1]];
        break;
      case 'L': 
        head = [head[0] - 2, head[1]];
        break;
      case 'D': 
        head = [head[0], head[1] + 2];
        break;
      case 'U': 
        head = [head[0], head[1] - 2];
        break;
    }

    dots.push(head)
    setChangingDirection(false)

    if(head.toString() === foodCoordinates.toString()) {
      setSnakeDots(dots)
      getRandomCoordinates()
      let speed = snakeSpeed
      speed = speed - 1
      setSnakeSpeed(speed)
      return
    }

    dots.shift()
    setSnakeDots(dots)
    checkGameOver()
  }, [
    snakeDots, 
    direction, 
    checkGameOver, 
    gameOver, 
    foodCoordinates, 
    snakeSpeed
  ])

  const handlePlayAgain = () => {
    setSnakeDots([[0,0], [2,0]])
    setGameOver(false)
    setDirection('R')
    setSnakeSpeed(200)
    getRandomCoordinates()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake()
    }, snakeSpeed)

    return () => {
      clearInterval(interval);
    }
  }, [moveSnake, snakeSpeed])

  useEffect(() => {    
    getRandomCoordinates()
  }, [])

  useEffect(() => {
    document.onkeydown = onKeyDown
  }, [onKeyDown])

  return (
    <>
      {
        gameOver && 
        <GameOver 
          onPlayAgain={handlePlayAgain}
        />
      }
      <GameArea>
        {
          !gameOver &&
          <Snake 
            dots={snakeDots}
          />
        }
        
        <SnakeFood
          coordinates={foodCoordinates}
        />
      </GameArea>
      
    </>
  );
}

export default App;
