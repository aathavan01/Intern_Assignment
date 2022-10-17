import { useEffect, useRef, useState } from "react";
import axios from "./axios";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);

  const nameRef = useRef();
  const latRef = useRef();
  const lngRef = useRef();

  // const [name, setName] = useState("");
  // const [body, setBody] = useState("");

  useEffect(() => {
    axios
      .get("/user/senzmate/city")
      .then((res) => {
        console.log(res.data.content);
        setData(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addCity = (e) => {
    try {
      e.preventDefault();
      axios
        .post("/user/senzmate/city", {
          name: nameRef.current.value,
          coordinate: {
            lat: latRef.current.value,
            lng: lngRef.current.value,
          },
        })
        .then((res) => {
          //console.log(res);
          console.log(res);
          // data.append(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // const deleteCity = (e) => {
  //   e.preventDefault();
  //   axios
  //     .delete(`/user/senzmate/city/name/${name}`)
  //     .then((res) => {
  //       console.log(res,"sucess");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const arr = data.map((data, index) => {
    return (
      <tr key={index} style={{background:"lightBlue"}}>
        <td style={{ border: "2px solid black" }}>{index + 1}</td>
        <td style={{ border: "2px solid black" }}>{data.cityId}</td>
        <td style={{ border: "2px solid black" }}>{data.name}</td>
        <td style={{ border: "2px solid black" }}>{data.coordinate.lat}</td>
        <td style={{ border: "2px solid black" }}>{data.coordinate.lng}</td>
        <td style={{ border: "2px solid black" }}>
          <button style={{background:"red"}}
            onClick={(e) => {
              e.preventDefault();
              axios
                .delete(`/user/senzmate/city/name/${data.name}`)
                .then((res) => {
                  console.log(res, "sucess");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            //  onClick={deleteCity}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <form style={{background:"orange"}}>
        <label htmlFor="name">City Name</label><br/>
        <input type="text" ref={nameRef} id="name" />
        <br />
        <label htmlFor="lat">Coordinate(Lan)</label><br/>
        <input type="text" ref={latRef} id="lat" /><br/>
        <label htmlFor="lng">Coordinate(Lng)</label><br/>
        <input type="text" ref={lngRef} id="lng" />
        <br />
        <button className="btn" onClick={addCity}>
          Get all city
        </button>
      </form>
      <tr style={{background:"lightBlue"}}>
        <td style={{ border: "2px solid black" }}>Number</td>
        <td style={{ border: "2px solid black" }}>City Id</td>
        <td style={{ border: "2px solid black" }}>City</td>
        <td style={{ border: "2px solid black" }}>Coordinates (Lat)</td>
        <td style={{ border: "2px solid black" }}>Coordinates (Lng)</td>
        <td style={{ border: "2px solid black" }}>Action</td>
      </tr>
      {arr}
    </>
  );
};

export default App;
