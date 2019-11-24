import React from "react";

const FilterCity = props => {
  const { placeHolder, getAirports, filterCity, setFilterCity } = props;

  const keyUpHandler = event => {
    if (event.key === "Enter") getAirports();
  };

  const onBlurHandler = event => {
    getAirports();
  };

  return (
    <input
      className="form-control"
      value={filterCity}
      placeholder={placeHolder}
      onKeyUp={keyUpHandler}
      onBlur={onBlurHandler}
      onChange={event => setFilterCity(event.target.value)}
    />
  );
};

export default FilterCity;
