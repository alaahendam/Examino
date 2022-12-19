import React from 'react'
import Carousel from 'react-grid-carousel'
import "./Sliderr.css";
const Sliderr = () => {

  return (
    <div style={{display:"flex",justifyContent:"center"}}>
      <div style={{
      width:"80%",
    }}>
      <h3 style={{textAlign:"center"}}> We Bult Our Trust With Our<br/> Proffesors & Students</h3>
      <br/>
    <Carousel className="Carousell" cols={3} rows={1} gap={10} loop >
      <Carousel.Item >
        <img  width="100%" className='carsImage' src="https://picsum.photos/800/600?random=1" />
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%"  className='carsImage' src="https://picsum.photos/800/600?random=2" />
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%"  className='carsImage' src="https://picsum.photos/800/600?random=3" />
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%"  className='carsImage' src="https://picsum.photos/800/600?random=2" />
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%"  className='carsImage' src="https://picsum.photos/800/600?random=3" />
      </Carousel.Item>
    </Carousel>
    </div>
    </div>
  )
}
export default Sliderr;