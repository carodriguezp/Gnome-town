import React, { useEffect, useState } from 'react';

import { GnomeTypeResponse } from '../common.types';
import { getDataFromApi } from '../../services/api';

import Form from './form/Form';
import GnomeList from './gnomes/GnomeList';


function Main() {

    const [gnomes, setGnomes] = useState<GnomeTypeResponse[]>([]);
    const [filterName, setFilterName] = useState("") //para guardar el Filter por nombre

    async function fetchGnomes() {
        try {
            const allGnomes = await getDataFromApi();

            setGnomes(allGnomes)
        } catch (error) {
            console.error('Sorry, the gnomes are on vacation.', error);
        }
    }

    //SEARCH FOR NAME
    const handleFilterName = (value: string) => {
        setFilterName(value)
    }

    const filteredGnomes = gnomes
        .filter((gnome) => {
            return gnome.name.toLowerCase().includes(filterName.toLowerCase())
        })

    const hasFiltered = !!filteredGnomes.length

    useEffect(() => {
        fetchGnomes();

    }, []);

    return (
        <section>

            <Form filterName={filterName} handleFilterName={handleFilterName} hasFiltered={hasFiltered} />

            <GnomeList gnomes={filteredGnomes} />
        </section>
    )
}

export default Main
