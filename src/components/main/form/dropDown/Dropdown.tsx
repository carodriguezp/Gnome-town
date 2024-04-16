import React from 'react'

// se reutilizará para el SORT y el PROFESIONS

function Dropdown({ labelText, optionsList }: { labelText: string, optionsList: string[] }) {



    return (
        <section>
            <label htmlFor="">{labelText}</label>

            <select
                className=""
            >
                {optionsList.map((option, i) => <option value={option} key={i}>{option}</option>)}


            </select>

        </section>
    )
}

export default Dropdown
