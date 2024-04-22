import React from 'react'

// se reutilizará para el SORT y el PROFESIONS

function Dropdown({ labelText, optionsList, handleChange }: { labelText: string, optionsList: string[], handleChange: (x: string) => void }) {



    return (
        <section>
            <label htmlFor="">{labelText}</label>

            <select
                className=""
                onChange={(ev) => handleChange(ev.target.value)}
            >
                {optionsList.map((option, i) => <option value={option} key={i} >{option}</option>)}


            </select>

        </section>
    )
}

export default Dropdown
