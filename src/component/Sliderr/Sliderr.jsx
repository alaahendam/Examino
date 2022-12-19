import React from "react";
import Carousel from "react-grid-carousel";
import "./Sliderr.css";
import image from "../../images/m7md.jpg"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
const Sliderr = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div style={{display:"flex",justifyContent:"center"}}>
      <div style={{
      width:"80%",
    }}>
      <h3 style={{textAlign:"center"}}> We Bult Our Trust With Our<br/> Proffesors & Students</h3>
      <br/>
    <Carousel className="Carousell" cols={3} rows={1} gap={10} loop >
      <Carousel.Item >
  
        <React.Fragment  >
        <img  width="100%" className='carsImage' src={image} onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
      >

        <DialogContent style={{textAlign:"center",height:"100%",width:"100%"}}>
          <img src={image} style={{width:"100%",height:"90%px"}}/>
        </DialogContent>
      </Dialog>
    </React.Fragment>
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%"  className='carsImage' src={image} />
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%"  className='carsImage' src={image} />
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%"  className='carsImage' src={image} />
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%"  className='carsImage' src={image} />
      </Carousel.Item>
    </Carousel>
    </div>
    </div>
  );
};
export default Sliderr;
