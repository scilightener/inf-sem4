import React from "react"
import { useState, useEffect } from "react";
import { Card } from "antd";
import { NavLink } from "react-router-dom";
import "./MainPage.css";
import axios from "axios";

const { Meta } = Card;

const MainPage = () => {
  const [breedsByAlph, setBreedsByAlph] = useState([]);
  for (let i = 0; i < 26; i++) {
    breedsByAlph.push([]);
  }
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://api.thedogapi.com/v1/breeds", {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-api-key': 'live_K9rScti9X3Ve3sjR1OmzNiRKbZn7pnIJFo630abbzpM7uuqL32G64Tr8B8NLa1BL'
          }
        });
        if (response.status != 200) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let dogs = response.data;
        dogs.forEach(breed => {
          breedsByAlph[breed.name.charCodeAt(0) - 'A'.charCodeAt(0)].push(breed)
        });
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData()
  }, [])

  return (
    <>
      {isLoading && <h1>A moment please...</h1>}
      {error && (
        <div>{`There is a problem fetching data - ${error}`}</div>
      )}
      {breedsByAlph.map((breedsByLetter, ind) => (
        <>
          {breedsByLetter.length > 0 && (
            <div className="letter-span">
              <div className="letter card">
                <Card
                  key={String.fromCharCode(ind + 'A'.charCodeAt(0))}
                  hoverable
                  style={{ width: 400 }}>
                  <Meta title={String.fromCharCode(ind + 'A'.charCodeAt(0))} />
                </Card>
              </div>
              {breedsByLetter && breedsByLetter.map(breed => (
                <div className="dog card">
                  <NavLink to={`/dog/${breed.image.id}`}>
                    <Card
                      key={breed.id}
                      hoverable
                      style={{ maxWidth: 400 }}
                      cover={<img alt="dog" src={breed.image.url} />}>
                      <Meta title={breed.name} />
                    </Card>
                  </NavLink>
                </div>
              ))}
            </div>
          )}
        </>
      ))}
    </>
  );
}

export default MainPage;