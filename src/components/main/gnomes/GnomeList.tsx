import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getDataFromApi } from '../../../services/api'
import GnomeCard from './GnomeCard';
import type { GnomeType, GnomeTypeResponse } from '../../common.types'

function GnomeList({ gnomes }: { gnomes: GnomeTypeResponse[] }) {


    return (
        <section className="">

            <h2 className="">List of Gnomes</h2>

            <ul className="" >
                {gnomes.map((gnome) => {


                    return <li className="" key={gnome.id}>
                        <Link to={`/gnome/${gnome.id}`}>
                            {/* <CharacterCard character={character} /> */}

                            <div>
                                <img className="" src={gnome.image} alt={gnome.name} />
                                <h3>Name: {gnome.name}</h3>
                                <p>Age: {gnome.age}</p>
                                <p>Works as: {gnome.job.length ? gnome.job.join(", ") : "Nothing"}</p>
                            </div>

                        </Link>
                    </li>

                })}
            </ul>

        </section>
    )
}




export default GnomeList
