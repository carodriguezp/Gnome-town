import React, { useEffect, useState } from 'react'
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

    return (
        <form>
            <InputText placeholder="Tobus Quickwhistle" value={filterName} handleChange={handleFilterName} hasFiltered={hasFiltered} />
            <Dropdown labelText="Filter by profession" optionsList={sortedJobsArray} handleChange={handleFilterJob} />
            <Dropdown labelText="Sort by age" optionsList={sortAgeArray} handleChange={handleSortAge} />
        </form>
    )
}

export default Form
