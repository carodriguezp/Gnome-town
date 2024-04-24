import React from 'react'
import { Label, SectionForm, Select } from '../../../../styles/SectionForm'

// se reutilizará para el SORT y el PROFESIONS

function Dropdown({ labelText, optionsList, handleChange }: { labelText: string, optionsList: string[], handleChange: (x: string) => void }) {



    return (
        <SectionForm>
            <Label htmlFor="">{labelText}</Label>

            <Select
                onChange={(ev) => handleChange(ev.target.value)}
            >
                {optionsList.map((option, i) => <option value={option} key={i} >{option}</option>)}


            </Select>

        </SectionForm>
    )
}

export default Dropdown
