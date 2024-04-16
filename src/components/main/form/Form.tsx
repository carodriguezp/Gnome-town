import React, { useEffect, useState } from 'react'
import Dropdown from './dropDown/Dropdown'
import { getJobList } from './dropDown/helper'
import InputText from './inputText/InputText'


function Form() {

    const [sortedJobsArray, setSortedJobsArray] = useState<Array<string>>([])
    const [sortAgeArray, setSortAgeArray] = useState<Array<string>>(["Ascending", "Descending"])

    useEffect(() => { setJobs() }, [])

    const setJobs = async () => {
        const jobsOptions = await getJobList()
        setSortedJobsArray(jobsOptions)
    }

    return (
        <form>
            <InputText />
            <Dropdown labelText="Filter by profession" optionsList={sortedJobsArray} />
            <Dropdown labelText="Sort by age" optionsList={sortAgeArray} />
        </form>
    )
}

export default Form
