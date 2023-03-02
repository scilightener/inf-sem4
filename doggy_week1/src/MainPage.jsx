import React from "react"
import { useState, useEffect } from "react";
import { Card, Pagination, Spin, Slider, Button } from "antd";
import { NavLink } from "react-router-dom";
import "./MainPage.css";
import axios from "axios";

const { Meta } = Card;
const ranges = {
  "weight": [0, 100],
  "height": [0, 100],
  "age": [0, 100],
  "name": [0, 25]
}

const MainPage = () => {
  const [sendRequest, setSendRequest] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dogs, setDogs] = useState();
  const [dogsCount, setDogsCount] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, _] = useState({
    "weight": ranges.weight,
    "height": ranges.height,
    "age": ranges.age,
    "name": ranges.name
  });
  useEffect(() => {
    if (!sendRequest) {
      return;
    }
    const getData = async () => {
      try {
        const response = await axios.get(`https://localhost:7018/dogs?pageId=${currentPage}&pageSize=${pageSize}&beginWeight=${filters.weight[0]}&endWeight=${filters.weight[1]}&beginHeight=${filters.height[0]}&endHeight=${filters.height[1]}&beginAge=${filters.age[0]}&endAge=${filters.age[1]}&beginLetter=${String.fromCharCode('A'.charCodeAt(0) + filters.name[0])}&endLetter=${String.fromCharCode('A'.charCodeAt(0) + filters.name[1])}`);
        if (response.status != 200) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`);
        }
        const data = response.data;
        setDogs(data.dogs);
        setDogsCount(data.count);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
        setSendRequest(false)
      }
    }
    getData()
  }, [sendRequest])

  const updatePage = (p, ps) => {
    setCurrentPage(p);
    setPageSize(ps);
    setSendRequest(true);
  }

  const updateFilters = (filter, minValue, maxValue) => {
    filters[filter] = [minValue, maxValue];
  }

  const formatter = (val) => String.fromCharCode('A'.charCodeAt(0) + val);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {isLoading && <Spin key={'loadingSpin'} size="large" style={{ position: 'absolute', top: '50%' }} />}
      {error && <div><h1 style={{ color: 'red' }}>{`There is a problem fetching data - ${error}`}</h1></div>}
      {dogs && <div className="dogs-span">
        {dogs.map(dog =>
          <div className="card">
            <NavLink key={`dog${dog.id}NavLink`} to={`/dog/${dog.id}`}>
              <Card
                key={`dog${dog.id}Card`}
                hoverable
                style={{ maxWidth: 400 }}
                cover={<img alt="dog" src={dog.imageUrl} />}>
                <Meta title={dog.breedName} />
              </Card>
            </NavLink>
          </div>
        )}
      </div>}
      <div className="filter-span">
        <div className="weight filter">
          <h4>Weight:</h4>
          <Slider key={'weightSlide'} range min={ranges.weight[0]} max={ranges.weight[1]} defaultValue={filters.weight} onChange={vals => updateFilters("weight", vals[0], vals[1])} />
        </div>
        <div className="height filter">
          <h4>Height:</h4>
          <Slider key={'heightSlide'} range min={ranges.height[0]} max={ranges.height[1]} defaultValue={filters.height} onChange={vals => updateFilters("height", vals[0], vals[1])} />
        </div>
        <div className="age filter">
          <h4>Age:</h4>
          <Slider key={'ageSlide'} range min={ranges.age[0]} max={ranges.age[1]} defaultValue={filters.age} onChange={vals => updateFilters("age", vals[0], vals[1])} />
        </div>
        <div className="name filter">
          <h4>Breeds by name:</h4>
          <Slider key={'nameSlide'} range min={ranges.name[0]} max={ranges.name[1]} defaultValue={filters.name} tooltip={{ formatter }} onChange={vals => updateFilters("name", vals[0], vals[1])} />
        </div>
        <Button key={'applyFilter'} type="primary" onClick={() => setSendRequest(true)}>Filter</Button>
      </div>
      {!isLoading && !error && dogsCount && <Pagination
        key={'pagination'}
        total={dogsCount}
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