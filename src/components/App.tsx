import React, { useEffect, useState } from 'react';

import { getDataFromApi } from '../services/api';
import type { GnomeType, GnomeTypeResponse } from '../components/common.types'
import { getJobList } from './main/form/dropDown/helper';

import Header from './Header';
import Form from './main/form/Form';
import Footer from './Footer';
import GnomeList from './main/gnomes/GnomeList';

import logo from '../logo.svg';
import '../App.css';

function App() {

  const [gnomesBrastlewark, setGnomesBrastlewark] = useState<GnomeTypeResponse[]>([]);


  const fetchDataFromApi = async () => {
    const data = await getDataFromApi()
    setGnomesBrastlewark(data)
  }


  useEffect(() => {

    fetchDataFromApi()

  }, [])


  return (
    <main className="App">

      <Header />
      <Form />
      <GnomeList />
      <Footer />

    </main>
  );
}

export default App;
