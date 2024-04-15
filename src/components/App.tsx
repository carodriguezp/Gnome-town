import React, { useEffect, useState } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { getDataFromApi } from '../services/api';
import type { GnomeType, GnomeTypeResponse } from '../components/common.types'
import { getJobList } from './main/form/dropDown/helper';



function App() {

  const [gnomesBrastlewark, setGnomesBrastlewark] = useState<GnomeTypeResponse[]>([]);


  const fetchDataFromApi = async () => {
    const data = await getDataFromApi()
    setGnomesBrastlewark(data)
  }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchApi = async () => {
      await fetchDataFromApi()
    };
    fetchApi()

  }, [])


  return (
    <body className="App">

    </body>
  );
}

export default App;
