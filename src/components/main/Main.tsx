import React, { useEffect, useState } from 'react';

import { GnomeTypeResponse } from '../common.types';
import { getDataFromApi } from '../../services/api';

import Form from './form/Form';
import GnomeList from './gnomes/GnomeList';


function Main() {

    const [gnomes, setGnomes] = useState<GnomeTypeResponse[]>([]);


    async function fetchGnomes() {
        try {
            const allGnomes = await getDataFromApi();

            setGnomes(allGnomes)
        } catch (error) {
            console.error('Sorry, the gnomes are on vacation.', error);
        }
    }



    useEffect(() => {
        fetchGnomes();

    }, []);

    return (
        <section>

            <Form />

            <GnomeList gnomes={gnomes} />
        </section>
    )
}

export default Main
