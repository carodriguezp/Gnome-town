import { useEffect, useState, lazy, Suspense } from "react";
import styled from "styled-components";

import { GnomeTypeResponse } from "../common.types";
import { getDataFromApi } from "../../services/api";

import Form from "./form/Form";
import LoadingState from "../LoadingState";

const GnomeList = lazy(() => import("./gnomes/GnomeList"));

const Section = styled.section`
  margin: 10px;

  @media (min-width: 768px) {
    margin: 30px;
  }
`;

const LoadingContainer = styled.div`
  margin: -10px;

  @media (min-width: 768px) {
    margin: -30px;
  }
`;

function Main() {
  const [gnomes, setGnomes] = useState<GnomeTypeResponse[]>([]);
  const [filterName, setFilterName] = useState(""); //para guardar el Filter por nombre
  const [filterJob, setFilterJob] = useState("All");
  const [sortAge, setSortAge] = useState("Ascending");
  // const [isLoading, setIsLoading] = useState(true);

  async function fetchGnomes() {
    try {
      const allGnomes = await getDataFromApi();

      setGnomes(allGnomes);
      // setIsLoading(false);
    } catch (error) {
      console.error("Sorry, the gnomes are on vacation.", error);
    }
  }

  //SEARCH FOR NAME
  const handleFilterName = (value: string) => {
    setFilterName(value);
  };

  const handleFilterJob = (value: string) => {
    setFilterJob(value);
  };

  const handleSortAge = (value: string) => {
    setSortAge(value);
  };

  const filteredGnomes = gnomes
    .filter((gnome) => {
      return gnome.name.toLowerCase().includes(filterName.toLowerCase());
    })
    .filter((gnome) => {
      if (gnome.job.toString().includes(filterJob)) {
        return gnome.job;
      } else if (filterJob === "Unemployed") {
        return !gnome.job.length;
      } else {
        return true;
      }
    })
    .sort((a, b) => {
      if (sortAge === "Ascending") {
        return a.age - b.age;
      } else {
        return b.age - a.age;
      }
    });

  const hasFiltered = !!filteredGnomes.length;

  useEffect(() => {
    fetchGnomes();
  }, []);

  return (
    <Section>
      <Form
        filterName={filterName}
        handleFilterName={handleFilterName}
        hasFiltered={hasFiltered}
        handleFilterJob={handleFilterJob}
        handleSortAge={handleSortAge}
      />

      {/* {isLoading ? <Div><LoadingState /></Div> : <GnomeList gnomes={filteredGnomes} />} */}

      {filteredGnomes ? (
        <Suspense
          fallback={
            <LoadingContainer>
              <LoadingState />
            </LoadingContainer>
          }
        >
          <GnomeList gnomes={filteredGnomes} />
        </Suspense>
      ) : (
        <p>'Sorry, the gnomes are on vacation.'</p>
      )}
    </Section>
  );
}

export default Main;
