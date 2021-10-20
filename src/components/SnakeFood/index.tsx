
import './styles.css'

interface SnakeFoodProps {
  coordinates: number[]
}

const SnakeFood = (props: SnakeFoodProps) => {
  const style = {
    left: `${props.coordinates[0]}%`,
    top: `${props.coordinates[1]}%`,
  }

  return (
    <div className='food' style={style}>

    </div>
  )
}

export default SnakeFood