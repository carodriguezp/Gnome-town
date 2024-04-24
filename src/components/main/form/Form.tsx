import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { fonts, colors } from '../../../styles/variables';
import Dropdown from './dropDown/Dropdown'
import { getJobList } from './dropDown/helper'
import InputText from './inputText/InputText'

//crear objeto de las props de filter 
//crear tipo del objeto como hice en inputText

function Form(props: { filterName: string, handleFilterName: (x: string) => void, hasFiltered: boolean, handleFilterJob: (x: string) => void, handleSortAge: (x: string) => void }) {

    const {
        filterName,
        handleFilterName,
        hasFiltered,
        handleFilterJob,
        handleSortAge
    } = props


    const [sortedJobsArray, setSortedJobsArray] = useState<Array<string>>([])
    const [sortAgeArray, setSortAgeArray] = useState<Array<string>>(["Ascending", "Descending"])


    const setJobs = async () => {
        const jobsOptions = await getJobList()
        setSortedJobsArray(jobsOptions)
    }

    useEffect(() => { setJobs() }, [])


    const Form = styled.form`
    display: flex;
    flex-direction: column;
    background-color: ${colors.faireBrownRed};
    font-size: 1rem;
    padding: 5px;
    border: 1px solid black;
    border-radius: 5px;
    @media (min-width: 1024px) {

        flex-direction: row;
    justify-content: space-between;
}
  `;

    return (
        <Form>
            <InputText placeholder="Tobus Quickwhistle" value={filterName} handleChange={handleFilterName} hasFiltered={hasFiltered} />
            <Dropdown labelText="Filter by profession" optionsList={sortedJobsArray} handleChange={handleFilterJob} />
            <Dropdown labelText="Sort by age" optionsList={sortAgeArray} handleChange={handleSortAge} />
        </Form>
    )
}

export default Form
