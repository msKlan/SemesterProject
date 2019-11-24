import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ListHeaders from "../Components/ListHeaders";
import NewTask from "../Components/NewTask";
import FilterCity from "../Components/FilterCity";
import SelectAirport from "../Components/SelectAirport";
import Task from "../Components/Task";
import Filter from "../Components/Filter";
import URL from "../settings";

const List = props => {
  const { apiFacade } = props;

  const [list, setList] = useState([]); // Slet ?
  const [newTask, setNewTask] = useState(""); // Slet ?

  const [depFilterCity, setDepFilterCity] = useState("");
  const [depAirports, setDepAirports] = useState([]);
  const [depAirport, setDepAirport] = useState("");

  const [arrFilterCity, setArrFilterCity] = useState("");
  const [arrAirports, setArrAirports] = useState([]);
  const [arrAirport, setArrAirport] = useState("");

  const [flights, setFlights] = useState([]);

  const [date, setDate] = useState(new Date());

  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true);

    fetch(
      "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2019-09-01?inboundpartialdate=2019-12-01",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
          "x-rapidapi-key": "fc57adf466mshe3a11f65601f877p1981cajsn0d68dc42ed6c"
        }
      }
    )
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });

    setLoading(false);
  }, []);

  const getDepAirports = () => {
    console.log("getDepAirports: ", depFilterCity);
    setLoading(true);
    // console.log("xxxx: ", apiFacade.getDepAirports(depFilterCity));
    apiFacade.getDepAirports(depFilterCity).then(data => {
      console.log(data);
      setDepAirports(data.Places);
    });

    setLoading(false);
  };

  const getArrAirports = () => {
    console.log("getArrAirports: ", arrFilterCity);
    setLoading(true);
    // console.log("xxxx: ", apiFacade.getArrAirports(arrFilterCity));
    apiFacade.getArrAirports(arrFilterCity).then(data => {
      console.log(data);
      setArrAirports(data.Places);
    });

    setLoading(false);
  };

  const getFlights = () => {};

  const addTask = () => {
    if (!newTask) return;
    setLoading(true);
    fetch("https://5cfabdcbf26e8c00146d0b0e.mockapi.io/tasks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description: newTask,
        createdAt: new Date().toISOString(),
        done: false,
        updatedAt: ""
      })
    })
      .then(resp => resp.json())
      .then(data => {
        const newList = [...list, data].sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : -1
        );
        setList(newList);
        setNewTask("");
        setLoading(false);
      });
  };

  const toogleTask = task => {
    const { id, done } = task;

    setLoading(true);
    fetch(`https://5cfabdcbf26e8c00146d0b0e.mockapi.io/tasks/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        done: !done,
        updatedAt: new Date().toISOString()
      })
    })
      .then(resp => resp.json())
      .then(data => {
        const newList = list
          .map(l => {
            if (l.id === id) {
              l.done = data.done;
              l.updatedAt = data.updatedAt;
            }
            return l;
          })
          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        setList(newList);
        setNewTask("");
        setLoading(false);
      });
  };

  const deleteTask = task => {
    const { id } = task;
    setLoading(true);
    fetch(`https://5cfabdcbf26e8c00146d0b0e.mockapi.io/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        const newList = list
          .filter(l => l.id !== data.id)
          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        setList(newList);
        setLoading(false);
      });
  };

  const handleChange = date => {
    // setDate( date );
  };

  return (
    <div className="row">
      {loading ? <div className="loading" /> : ""}
      <div className="col-4">
        <FilterCity
          placeHolder="Enter departure city"
          getAirports={getDepAirports}
          FilterCity={depFilterCity}
          setFilterCity={setDepFilterCity}
        />
      </div>
      <div className="col-8">
        <SelectAirport airports={depAirports} setAirport={setDepAirport} />
      </div>
      <div className="col-4">
        <FilterCity
          placeHolder="Enter arrival city"
          getAirports={getArrAirports}
          FilterCity={arrFilterCity}
          setFilterCity={setArrFilterCity}
        />
      </div>
      <div className="col-8">
        <SelectAirport airports={arrAirports} setAirport={setArrAirport} />
      </div>

      <div className="col-12">
        <DatePicker
          selected={date}
          onChange={handleChange}
          dateFormat="dd-MMM-yyyy"
        />
      </div>

      <div className="col-12">
        <hr />
      </div>

      <div className="col-12">
        <ul className="list-group">
          <ListHeaders />
          {/* {filteredList.map(flight => (
            <Flight
              key={flight.id}
              flight={flight}
              toogleFlight={toogleFlight}
              deleteFlight={deleteFlight}
              id={flight.id}
            />
          ))} */}
        </ul>
      </div>
      <p>{JSON.stringify(depFilterCity)}</p>
    </div>
  );
};
export default List;
