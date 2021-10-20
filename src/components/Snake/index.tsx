
import './styles.css'

interface snakeDots{
  dots: number[][]
}

const Snake = (props: snakeDots) => {
  return (
    <div>
      {
        props.dots.map((dot, i) => {

          const style = {
            left: `${dot[0]}%`,
            top: `${dot[1]}%`
          }
          
          return (
            <div key={i} className='snake' style={style}>
            </div>
          )

        })
      }
    </div>
  )
}

export default Snake