import React, { useRef, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Header from '../component/Header';
import styled from 'styled-components';
import '../css/makecircle.css';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/esm/Button';
import { Interests } from '../component/Interests';
import axios from 'axios';
import { Modal } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  backgroundColor: 'white',
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  padding: 20,
};

const TitleText = styled.text`
  font-family: 'IBM-Regular';
  font-size: 24px;
  margin: 20px 0;
`;

const InterestDiv = styled.div`
  width: 700px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px auto;
  padding: 5px 0;
  border-radius: 20px;
`;

const ImageSelectButton = styled.div`
  border: none;
  border-radius: 20px;
  width: 200px;
  height: 200px;
  font-size: 50px;
  margin: auto auto;
  background-color: white;
`;

const StyledInput = styled.input`
  background-color: white;
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: limegreen;
  }
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
  justify-content: center;
`;

const StyledP = styled.p`
  margin-top: 16px;
  margin-left: 0.7rem;
`;

function MakeCircle(props) {
  const arr = [
    {
      id: 1,
      name: '??????',
      src: '../img/interests/workout.png',
    },
    {
      id: 2,
      name: '??????',
      src: '../img/interests/study.png',
    },
    {
      id: 3,
      name: '??????',
      src: '../img/interests/trip.png',
    },
    {
      id: 4,
      name: '??????',
      src: '../img/interests/cooking.png',
    },
    {
      id: 5,
      name: 'IT',
      src: '../img/interests/coding.png',
    },
    { id: 6, name: '??????', src: '../img/interests/volunteer.png' },
    {
      id: 7,
      name: '????????????',
      src: '../img/interests/pet.png',
    },
    {
      id: 8,
      name: '?????????',
      src: '../img/interests/car.png',
    },
    {
      id: 9,
      name: '??????',
      src: '../img/interests/music.png',
    },
    { id: 10, name: '??????', src: '../img/interests/culture.png' },
    {
      id: 11,
      name: '??????',
      src: '../img/interests/game.png',
    },
    {
      id: 12,
      name: '??????',
      src: '../img/interests/fashion.png',
    },
  ];

  const LocationOptions = [
    {
      id: 1,
      name: '??????',
    },
    {
      id: 2,
      name: '??????',
    },
    {
      id: 3,
      name: '??????',
    },
    {
      id: 4,
      name: '??????',
    },
    {
      id: 5,
      name: '??????',
    },
    {
      id: 6,
      name: '??????',
    },
    {
      id: 7,
      name: '??????',
    },
    {
      id: 8,
      name: '??????',
    },
    {
      id: 9,
      name: '?????????',
    },
    {
      id: 10,
      name: '?????????',
    },
    {
      id: 11,
      name: '?????????',
    },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [fileImage, setFileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [circleName, setCircleName] = useState('');
  const [circleLimit, setCircleLimit] = useState('');
  const [circleLimitPeople, setCircleLimitPeople] = useState(0);
  const [circleLocation, setCircleLocation] = useState(1);
  const [circleInfo, setCircleInfo] = useState('');
  const [interest, setInterest] = useState(0);
  const [genderLimit, setGenderLimit] = useState(0);
  const [prime, setPrime] = useState(0);
  const saveFileImage = e => {
    setImageFile(e.target.files[0]);
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };
  const text = '??????????????? ??????????????????';
  const submit = event => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('max_num', circleLimitPeople);
    formData.append('area_id', circleLocation);
    formData.append('interest_id', interest);
    formData.append('name', circleName);
    formData.append('restrict', circleLimit);
    formData.append('sex', genderLimit);
    formData.append('intro', circleInfo);
    formData.append('prime', prime);
    formData.append('image', imageFile);
    for (let value of formData.values()) {
      console.log(value);
    }
    axios
      .post('/circle/make', formData, {
        withCredentials: true,
      })
      .then(response => {
        response.data.isSuccess ? (document.location.href = '/') : console.log('none');
      })
      .catch(error => console.log(error));
  };
  const pushInterest = id => {
    setInterest(id);
  };

  const _onclick = id => {
    interest == id ? setInterest(0) : pushInterest(id);
    console.log(interest);
  };
  if (sessionStorage.length === 0) {
    document.location.href = 'login';
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Header bgcolor="#f5f8fc" />
      <Container fluid style={{ backgroundColor: '#b5d1ff' }}>
        <form encType="multipart/form-data" onSubmit={submit}>
          <div className="form-box">
            <div className="field1">
              <text style={{ fontFamily: 'IBM-Bold', fontSize: 45, margin: '0 auto' }}>????????? ????????? ?????????????????? !</text>
              <br />
              <TitleText>???????????? ?????? ????????? ????????? ??????????????????</TitleText>
              <InterestDiv>
                {arr.map(value =>
                  interest == value.id ? (
                    <div style={{ display: 'inline-block', margin: '5px 5px' }} key={value.id} onClick={() => _onclick(value.id)}>
                      <img
                        style={{ border: '4px solid black', borderRadius: '50%' }}
                        key={value.id}
                        src={value.src}
                        id={value.id}
                        name={value.name}
                        width={100}
                        height={100}
                      />
                      <br />
                      <text style={{ fontFamily: 'IBM-Regular' }}>{value.name}</text>
                    </div>
                  ) : (
                    <div style={{ display: 'inline-block', margin: '5px 5px' }} key={value.id} onClick={() => _onclick(value.id)}>
                      <img key={value.id} src={value.src} id={value.id} name={value.name} width={100} height={100} />
                      <br />
                      <text style={{ fontFamily: 'IBM-Regular' }}>{value.name}</text>
                    </div>
                  ),
                )}
              </InterestDiv>
              <TitleText>?????? ????????? ???????????????</TitleText>
              <br />
              <input className="textinput" type="text" placeholder="?????? ????????? ???????????????" onChange={e => setCircleName(e.target.value)} />
              <div>
                <TitleText>??????????????? ??????????????????</TitleText>
                <input
                  className="textinput"
                  type="number"
                  placeholder="?????? ??????(???)"
                  onChange={e => setCircleLimitPeople(parseInt(e.target.value))}
                />
              </div>
              <TitleText>??????????????? ??????????????????</TitleText>
              <br />
              <select
                style={{
                  display: 'block',
                  width: 200,
                  padding: '0.5rem 0.8rem 0.5rem 0.8rem',
                  margin: '0.9vw auto',
                  border: 0,
                  borderRadius: 5,
                  fontSize: 20,
                }}
                defaultValue={circleLocation}
                name="genderLimit"
                onChange={e => setGenderLimit(parseInt(e.target.value))}
              >
                <option value="default" disabled={true}>
                  ?????? ??????
                </option>
                <option value="1">????????? ?????? ??????</option>
                <option value="2">????????? ?????? ??????</option>
                <option value="3">?????? ?????? ??????</option>
              </select>
              <textarea className="textinput" placeholder="??????????????? ???????????????" onChange={e => setCircleLimit(e.target.value)} />
              <TitleText>?????? ????????? ??????????????????</TitleText>
              <br />
              <select
                style={{
                  display: 'block',
                  width: 700,
                  padding: '0.5rem 0.8rem 0.5rem 0.8rem',
                  margin: '0.9vw auto',
                  border: 0,
                  borderRadius: 5,
                  fontSize: 20,
                }}
                defaultValue={circleLocation}
                name="location"
                onChange={e => setCircleLocation(parseInt(e.target.value))}
              >
                <option value="default" disabled={true}>
                  ????????? ??????????????????.
                </option>
                {LocationOptions.map(value => (
                  <option key={value.id} value={value.id}>
                    {value.name}
                  </option>
                ))}
                <option key="12" value="12">
                  ????????????
                </option>
              </select>
              <TitleText>????????? ??????????????????</TitleText>
              <textarea className="textinput" placeholder="?????? ????????? ???????????????" onChange={e => setCircleInfo(e.target.value)} />
              <TitleText>?????? ?????? ????????? ??????????????????</TitleText>
              <br />
              <br />
              <ImageSelectButton>
                <label>
                  <div style={{ margin: 'auto', textAlign: 'center' }}>
                    {fileImage ? (
                      <img alt="sample" src={fileImage} style={{ borderRadius: 10, marginTop: 10, width: '180px', height: '180px' }} />
                    ) : (
                      <text style={{ fontSize: 100, margin: 'auto 0', lineHeight: '180px' }}>+</text>
                    )}
                  </div>
                  <input type="file" name="image" style={{ display: 'none' }} onChange={saveFileImage} />
                </label>
              </ImageSelectButton>
            </div>
            <br />
            <TitleText>????????? ????????? ??????????????????</TitleText>
            <br />
            <div style={{ justifyContent: 'center', margin: '0 auto' }}>
              <StyledLabel htmlFor={text}>
                <StyledInput type="checkbox" id={text} name={text} />
                <StyledP>{text}</StyledP>
              </StyledLabel>
            </div>
            <Alert style={{ width: 730, margin: '0 auto' }} key="primary" variant="primary">
              ????????? ???????????? ? ????????? ?????? ????????? ???????????? ???????????? ????????? ???????????? ????????? ?????? ??? ?????? ??????????????????.
            </Alert>
            <Button size="lg" style={{ marginTop: 20, width: 700 }} variant="dark" onClick={submit} type="submit">
              ?????? ?????????
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default MakeCircle;
