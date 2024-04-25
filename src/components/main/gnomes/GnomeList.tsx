import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

import { fonts, colors } from '../../../styles/variables';
import { StyledLink } from '../../../styles/StyledLink';
import { getDataFromApi } from '../../../services/api'
import type { GnomeType, GnomeTypeResponse } from '../../common.types'

function GnomeList({ gnomes }: { gnomes: GnomeTypeResponse[] }) {

    const Section = styled.section`
    
        h2{
            color: ${colors.brownRed};
            font-family: ${fonts.titleFamily};
            text-align:center;
            font-size: 1.5rem;

        @media all and (min-width: 768px) {

            font-size: 2.3rem;

            }
        };

    `;

    const List = styled.ul`
        padding: 0;
        display: grid;
        grid-template-columns: 1fr;
        grid-column-gap: 20px;
        grid-row-gap: 20px;
        align-items: center;

        @media all and (min-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
        };
        @media all and (min-width: 1024px) {
            grid-template-columns: repeat(4, 1fr);
        };
            li{
                text-decoration:none;
                list-style: none;
            
            };
    `;

    const InfoCard = styled.div`
    
        background-color:${colors.clarireForest};
        padding: 10px;
        border-radius: 5px;
        border: 1px solid ${colors.darkForest};

        @media all and (min-width: 768px) {

            height:400px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }


        img{
            width:200px        ;
            max-height: 300px;
            display: block;
            margin: 0 auto;

            @media all and (min-width: 768px) {
                width:160px;
                max-height:200px
            };
            
            @media all and (min-width: 1024px) {
                width:200px;
                max-height:250px
            };
        };

        h3{
            color: ${colors.darkForest};
            font-family: ${fonts.titleFamily};
            font-size:1rem;
            padding-left: 10px;
            @media all and (min-width: 1024px) {
                font-size:1.2rem
            };
        };
        p{
            color: ${colors.darkForest};
            font-family: ${fonts.petrona};
            font-size:1rem;
            padding-left: 10px;

        }
    `;

    return (
        <Section>

            <h2>List of Gnomes</h2>

            <List >
                {gnomes.map((gnome) => {

                    return <li key={gnome.id}>
                        <StyledLink to={`/gnome/${gnome.id}`}>

                            <InfoCard>
                                <img src={gnome.image} alt={gnome.name} />
                                <div>
                                    <h3>Name: {gnome.name}</h3>
                                    <p><b>Age: </b>{gnome.age}</p>
                                    <p><b>Works as: </b>{gnome.job.length ? gnome.job.join(", ") : "Nothing"}</p>
                                </div>
                            </InfoCard>

                        </StyledLink>
                    </li>

                })}
            </List>

        </Section>
    )
}




export default GnomeList
