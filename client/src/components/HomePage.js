import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import linkIcon from "../images/link.svg";

function HomePage() {
  const [inputText, setInputText] = useState("ทะเล");
  const [destinations, setDestinations] = useState([]);

  const handleInputText = (event) => {
    setInputText(event.target.value);
    //console.log(inputText);
  };

  const searchDestinations = async () => {
    const results = await axios.get(
      `http://localhost:4001/trips?keywords=${inputText}`
    );
    setDestinations(results.data.data);
    // console.log(destinations);
  };

  //   const linkToCopy = "stupid-link";

  useEffect(() => {
    let timerId;
    if (inputText) {
      timerId = setTimeout(searchDestinations, 200);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [inputText]);

  const copyLink = (url) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="container">
      <h1>เที่ยวไหนดี</h1>
      <div className="body">
        <label className="input-label">ค้นหาที่ท่องเที่ยว</label>
        <input
          onChange={handleInputText}
          id="search-text"
          name="search-text"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          value={inputText}
        />

        <ul>
          {destinations.map((place, index) => {
            return (
              <li key={index} className="place-container">
                <div className="preview-image">
                  <img className="image" src={place.photos[0]} />
                </div>
                <div className="texts">
                  <h3>{place.title}</h3>
                  <p className="description">
                    {place.description.slice(0, 150)}
                  </p>
                  <a href={place.url}>อ่านต่อ</a>
                  <p className="tags">
                    <span>หมวด: </span>{" "}
                    {place.tags.map((tag) => {
                      return (
                        <span
                          onClick={() => {
                            setInputText(tag);
                          }}
                          classname="inditag"
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </p>
                  <div className="addi-images">
                    <img src={place.photos[1]} className="pic one" />
                    <img src={place.photos[2]} className="pic two" />
                    <img src={place.photos[3]} className="pic three" />
                    <img
                      role="button"
                      onClick={() => copyLink(place.url)}
                      src={linkIcon}
                      className="link-pic"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
