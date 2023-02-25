import React from "react"
import { useState, useEffect } from "react";
import { Card, Pagination, Spin } from "antd";
import { NavLink } from "react-router-dom";
import "./MainPage.css";
import axios from "axios";

const { Meta } = Card;

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dogs, setDogs] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://localhost:7018/dogs?pageId=${currentPage}&pageSize=${pageSize}`);
        if (response.status != 200) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`);
        }
        setDogs(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData()
  }, [currentPage, pageSize])

  const updatePage = (p, ps) => {
    setCurrentPage(p);
    setPageSize(ps);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {isLoading && <Spin size="large" style={{position: 'absolute', top: '50%'}}/>}
      {error && (
        <div><h1 style={{ color: 'red' }}>{`There is a problem fetching data - ${error}`}</h1></div>
      )}
      {dogs && <div className="dogs-span">
        {dogs.map(dog => (
          <div className="card">
            <NavLink to={`/dog/${dog.id}`}>
              <Card
                key={dog.id}
                hoverable
                style={{ maxWidth: 400 }}
                cover={<img alt="dog" src={dog.imageUrl} />}>
                <Meta title={dog.breedName} />
              </Card>
            </NavLink>
          </div>
        ))}
      </div>}

      {!isLoading && !error && <Pagination
        total={172}
        responsive={true}
        defaultCurrent={1}
        defaultPageSize={10}
        pageSizeOptions={[5, 10, 50, 100]}
        showSizeChanger={true}
        onChange={updatePage}
        style={{ padding: '40px' }} />}
    </div>
  );
}

export default MainPage;