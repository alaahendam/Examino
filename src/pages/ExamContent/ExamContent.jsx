import React from "react";
import "./ExamContent.css";
import CounterSlider from "../../component/CounterSlider";
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Item from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
const label = { inputProps: { 'aria-label': 'Switch demo' } };


function reducer(state, action) {
    if (action.type === "increment") {
      return {
        count: state.count + state.step,
        step: state.step
      };
    } else if (action.type === "decrement") {
      return {
        count: state.count - state.step,
        step: state.step
      };
    } else if (action.type === "reset") {
      return {
        count: 0,
        step: state.step
      };
    } else if (action.type === "updateStep") {
      return {
        count: state.count,
        step: action.step
      };
    } else {
      throw new Error("No such action");
    }
  }

function ExamContent(props){
    const [state, dispatch] = React.useReducer(reducer, { count: 0, step: 1 });
    const [timer, setTimer] = React.useState(20);
    const Navigate=useNavigate();
    const id = React.useRef(null);
    const clear = () => {
      window.clearInterval(id.current);
    };
    React.useEffect(() => {
      id.current = window.setInterval(() => {
        setTimer((time) => time - 1);
      }, 1000);
      return () => clear();
    }, []);
  
    React.useEffect(() => {
      if (timer === 0) {
        clear();
        Navigate("/")
      }
    }, [timer]);
  

    return(
        <div>
            <div className="ExamContent">
              <div className="TitleExam">
                <div style={{textAlign:"right"}}>
               <Switch {...label} defaultChecked/>
               </div>
                 <h3>Math Exam</h3>
              </div>
              <div className="InputGroup">
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                    <Item>
                    <TextField
                    className="textfield"
                    style={{
                        width:"100%",
                    }}
                        id="outlined-read-only-input"
                        defaultValue="Hello World"
                        value=" Student Name : Mohamed Adel Ibrahiem"
                        size="small"
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </Item>
                    </Grid>
                    <Grid item xs={3}>
                    <Item>
                    <TextField
                      style={{
                        width:"100%",
                    }}  
                        defaultValue="Hello World"
                         value={`Time left : ${timer}`}
                         size="small"
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </Item>
                 </Grid>
                </Grid>
               </Box>     
              </div>
              <div style={{paddingTop:"1rem",width:"100%"}}>
                <h5>Pages 3 of 10</h5>
              <CounterSlider
              style={{
                width:"100%"
              }}
        onChange={value =>
          dispatch({
            type: "updateStep",
            step: value
          })
        }
      />
      </div>
      {/* <h1>{state.count}</h1>
      <button
        onClick={() =>
          dispatch({
            type: "increment"
          })
        }
      >
        +
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "decrement"
          })
        }
      >
        -
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "reset"
          })
        }
      >
        Reset
      </button> */}
            </div>
        </div>
    )
}
export default ExamContent;