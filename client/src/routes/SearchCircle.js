import React, { useState } from 'react';
import Header from '../component/Header';
import styled from 'styled-components';
import { GoSearch } from 'react-icons/go';
import Card from 'react-bootstrap/Card';

const InterestOptions = [
  {
    id: 1,
    name: '운동',
  },
  {
    id: 2,
    name: '공부',
  },
  {
    id: 3,
    name: '여행',
  },
  {
    id: 4,
    name: '요리',
  },
  {
    id: 5,
    name: 'IT',
  },
  { id: 6, name: '봉사' },
  {
    id: 7,
    name: '반려동물',
  },
  {
    id: 8,
    name: '자동차',
  },
  {
    id: 9,
    name: '음악',
  },
  { id: 10, name: '문화' },
  {
    id: 11,
    name: '게임',
  },
  {
    id: 12,
    name: '패션',
  },
];

const LocationOptions = [
  {
    id: 1,
    name: '서울',
  },
  {
    id: 2,
    name: '부산',
  },
  {
    id: 3,
    name: '대구',
  },
  {
    id: 4,
    name: '인천',
  },
  {
    id: 5,
    name: '광주',
  },
  {
    id: 6,
    name: '대전',
  },
  {
    id: 7,
    name: '울산',
  },
  {
    id: 8,
    name: '세종',
  },
  {
    id: 9,
    name: '경기도',
  },
  {
    id: 10,
    name: '강원도',
  },
  {
    id: 11,
    name: '제주도',
  },
];

const SearchCategoryDiv = styled.div`
  display: flex;
  width: 1200px;
  border: 1px solid #c2c3c4;
  margin: 50px auto;
  padding: 30px;
  justify-content: space-between;
  background-color: #f5f8fc;
`;

const SearchList = styled.div`
  display: flex;
  width: 1200px;
  margin: 20px auto;
  flex-direction: 'row';
  flex-wrap: wrap;
  justify-content: space-between;
`;

function SearchCircle(props) {
  const [selectedLocation, setSelectedLocation] = useState('default');
  const [selectedInterest, setSelectedInterest] = useState('default');
  const [selectedLimit, setSelectedLimit] = useState('default');
  const [searchText, setSearchText] = useState('');

  const onChangeHandlerInterest = e => {
    setSelectedInterest(e.target.value);
    console.log(selectedInterest);
  };

  const onChangeHandlerLocation = e => {
    setSelectedLocation(e.target.value);
    console.log(selectedLocation);
  };

  const onChangeHandlerLimit = e => {
    setSelectedLimit(e.target.value);
    console.log(selectedLimit);
  };

  const onChangeHandlerText = e => {
    setSearchText(e.target.value);
  };

  const onSubmit = () => {
    console.log(selectedInterest);
    console.log(selectedLocation);
    console.log(selectedLimit);
    console.log(searchText);
  };

  return (
    <div>
      <Header bgcolor="#f5f8fc" />
      <SearchCategoryDiv>
        <select
          style={{ width: 200, height: 30, paddingLeft: 5 }}
          defaultValue={selectedInterest}
          name="category"
          onChange={onChangeHandlerInterest}
        >
          <option style={{ color: 'gray' }} value="default" disabled={true}>
            카테고리
          </option>
          {InterestOptions.map(value => (
            <option key={value.id} value={value.name}>
              {value.name}
            </option>
          ))}
        </select>
        <select
          style={{ width: 200, height: 30, paddingLeft: 5 }}
          defaultValue={selectedLocation}
          name="location"
          onChange={onChangeHandlerLocation}
        >
          <option style={{ color: 'gray' }} value="default" disabled={true}>
            지역
          </option>
          {LocationOptions.map(value => (
            <option key={value.id} value={value.name}>
              {value.name}
            </option>
          ))}
        </select>
        <select
          style={{ width: 200, height: 30, paddingLeft: 5 }}
          defaultValue={selectedLimit}
          name="gender"
          onChange={onChangeHandlerLimit}
        >
          <option style={{ color: 'gray' }} value="default" disabled={true}>
            성별제한
          </option>
          <option key="1" value="B">
            남자
          </option>
          <option key="2" value="G">
            여자
          </option>
          <option key="3" value="BG">
            없음
          </option>
        </select>
        <div style={{ display: 'inline-block' }}>
          <input
            style={{ width: 300, height: 30, paddingLeft: 5 }}
            type="text"
            placeholder="검색어를 입력하세요"
            onChange={onChangeHandlerText}
          />
          <GoSearch style={{ marginLeft: 5, marginBottom: 5 }} size="28" onClick={onSubmit} />
        </div>
      </SearchCategoryDiv>
      <div style={{ marginLeft: 120, fontSize: 28 }}>
        <text style={{ fontFamily: 'IBM-Medium' }}>검색 결과(1)</text>
      </div>
      <SearchList>
        <Card style={{ width: '18rem', marginBottom: 50 }}>
          <Card.Img style={{ margin: '30px auto', width: '15rem', height: '15rem' }} variant="top" src="img/coding.jpeg" />
          <Card.Body>
            <Card.Text style={{ fontFamily: 'IBM-SemiBold', margin: '0 15px', marginBottom: 15 }}>
              취업준비자를 위한 1일1코딩 풀이
            </Card.Text>
            <Card.Text style={{ fontFamily: 'IBM-Light', margin: '0 15px' }}>인원 : 128/300</Card.Text>
          </Card.Body>
        </Card>
      </SearchList>
    </div>
  );
}

export default SearchCircle;
