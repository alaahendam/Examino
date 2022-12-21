import React from "react";

function CounterSlider({ onChange }) {
  const [value, setValue] = React.useState(1);

  return (
    <div style={{width:"100%"}}>
    <React.Fragment>
      {value}
      <input
        type="range"
        min="1"
        max="10"
        style={{
            width:"90%"
        }}
        value={value}
        onChange={e => {
          const value = Number(e.target.value);
          setValue(value);
          onChange(value);
        }}
      />
    </React.Fragment>
    </div>
  );
}

export default CounterSlider;
