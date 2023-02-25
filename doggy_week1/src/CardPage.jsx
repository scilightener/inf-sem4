import { Card } from 'antd';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const { Meta } = Card;

const CardPage = (props) => {
  const params = useParams(props);
  const dogId = params.id;
  const [breedInfo, setBreedInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await axios.get(`https://localhost:7018/dogs/${dogId}`);
        if (resp.status != 200) {
          throw new Error(
            `This is an HTTP error: The status is ${resp.status}`
          );
        }
        let breed = resp.data;
        setBreedInfo(breed);
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
        <div><h1 style={{ color: 'red' }}>{`There is a problem fetching the post data - ${error}`}</h1></div>
      )}
      <Card
        hoverable
        style={{ maxWidth: 400, padding: 40 }}
        cover={<img alt={isLoading ? "" : "dog"} src={breedInfo && breedInfo.imageUrl} />}
        loading={isLoading}
      >
        {breedInfo && (<Meta title={breedInfo.breedName} description={`Typical weight: from ${breedInfo.minWeight} to ${breedInfo.maxWeight} kg
                Typical height: from ${breedInfo.minHeight} to ${breedInfo.maxHeight} cm
                Typical lifetime: from ${breedInfo.minAge} to ${breedInfo.maxAge} years`} />)}
      </Card>
    </div>
  )
}

export default CardPage;