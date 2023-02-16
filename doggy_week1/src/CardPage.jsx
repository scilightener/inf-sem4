import { Card } from 'antd';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const { Meta } = Card;

const CardPage = (props) => {
  const params = useParams(props);
  const imgId = params.id;
  const [breedImg, setBreedImg] = useState();
  const [breedInfo, setBreedInfo] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const r1 = await axios.get(`https://api.thedogapi.com/v1/images/${imgId}`, {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-api-key': 'live_K9rScti9X3Ve3sjR1OmzNiRKbZn7pnIJFo630abbzpM7uuqL32G64Tr8B8NLa1BL'
          }
        });
        if (r1.status != 200) {
          throw new Error(
            `This is an HTTP error: The status is ${r1.status}`
          );
        }
        let breed = r1.data;
        setBreedImg(breed.url);
        let breedId = breed.breeds[0].id;
        const r2 = await axios.get(`https://api.thedogapi.com/v1/breeds/${breedId}`, {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-api-key': 'live_K9rScti9X3Ve3sjR1OmzNiRKbZn7pnIJFo630abbzpM7uuqL32G64Tr8B8NLa1BL'
          }
        });
        if (r2.status != 200) {
          throw new Error(
            `This is an HTTP error: The status is ${r2.status}`
          );
        }
        let breedInfo = r2.data;
        setBreedInfo(breedInfo);
        setError(null);
      } catch (err) {
        setError(err.message);
        setBreedInfo(null);
      } finally {
        setIsLoading(false);
      }
    }
    getData()
  }, [])
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <Card
        hoverable
        style={{ maxWidth: 400, padding: 40 }}
        cover={<img alt={isLoading ? "" : "dog"} src={breedImg} />}
        loading={isLoading}
      >
        {breedInfo && (<Meta title={breedInfo.name} description={`Typical weight: ${breedInfo.weight.metric} kg
                Typical height: ${breedInfo.height.metric} cm
                Typical lifetime: ${breedInfo.life_span}`} />)}
      </Card>
    </div>
  )
}

export default CardPage;