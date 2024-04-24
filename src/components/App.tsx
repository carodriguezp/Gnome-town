import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { fonts, colors } from '../styles/variables';

import { getDataFromApi } from '../services/api';
import type { GnomeType, GnomeTypeResponse } from '../components/common.types'
import { getJobList } from './main/form/dropDown/helper';

import Header from './Header';
import Form from './main/form/Form';
import GnomeList from './main/gnomes/GnomeList';
import GnomeDetail from './main/gnomes/GnomeDetail';
import Main from './main/Main';





function App() {

  const [gnomesBrastlewark, setGnomesBrastlewark] = useState<GnomeTypeResponse[]>([]);


  const fetchDataFromApi = async () => {
    const data = await getDataFromApi()
    setGnomesBrastlewark(data)
  }


  useEffect(() => {

    fetchDataFromApi()

  }, [])


  //style

  const Container = styled.main`
    background-color: ${colors.faireWood};
    text-decoration: none;
  `;

  return (
    <Container >

      <Header />

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/gnome/:idGnome' element={<GnomeDetail />} />
      </Routes>


    </Container>
  );
}

export default App;
