import React from "react";

const SelectAirport = props => {
  const { airports, setAirport } = props;
  return (
    <select
      className="custom-select"
      // value={airports}
      onChange={event => setAirport(event.target.value)}
    >
      {airports.map(airport => (
        <option key={airport.PlaceId} value={airport.PlaceId}>
          {airport.PlaceId} {airport.PlaceName}
        </option>
      ))}
    </select>
  );
};
export default SelectAirport;
