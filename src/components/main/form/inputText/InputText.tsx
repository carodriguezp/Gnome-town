import React from 'react'

type InputTextType = { value: string, handleChange: (x: string) => void, placeholder: string, hasFiltered: boolean }

function InputText({ value, handleChange, placeholder, hasFiltered }: InputTextType) {


    return (
        <section>


            <label htmlFor="" className="">Search for Name</label>
            <input className="" type="text" name="" id="" placeholder={placeholder} value={value} onChange={(ev) => handleChange(ev.target.value)} />

            {(!hasFiltered && value) && <p className="error" >There is no gnome matching the word {value}</p>}


        </section>
    )
}

export default InputText
