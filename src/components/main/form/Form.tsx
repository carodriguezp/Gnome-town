import { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../../styles/variables";
import Dropdown from "./dropDown/Dropdown";
import { getJobList } from "./dropDown/helper";
import InputText from "./inputText/InputText";

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${colors.faireBrownRed};
  font-size: 1rem;
  padding: 5px;
  border: 1px solid ${colors.brownRed};
  border-radius: 5px;
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

function Form(props: {
  filterName: string;
  handleFilterName: (x: string) => void;
  hasFiltered: boolean;
  handleFilterJob: (x: string) => void;
  handleSortAge: (x: string) => void;
}) {
  const {
    filterName,
    handleFilterName,
    hasFiltered,
    handleFilterJob,
    handleSortAge,
  } = props;

  const [sortedJobsArray, setSortedJobsArray] = useState<Array<string>>([]);
  const [sortAgeArray] = useState<Array<string>>(["Ascending", "Descending"]);

  const setJobs = async () => {
    const jobsOptions = await getJobList();
    setSortedJobsArray(jobsOptions);
  };

  useEffect(() => {
    setJobs();
  }, []);

  return (
    <FormStyled>
      <InputText
        placeholder="Tobus Quickwhistle"
        value={filterName}
        handleChange={handleFilterName}
        hasFiltered={hasFiltered}
      />
      <Dropdown
        labelText="Filter by profession"
        optionsList={sortedJobsArray}
        handleChange={handleFilterJob}
      />
      <Dropdown
        labelText="Sort by age"
        optionsList={sortAgeArray}
        handleChange={handleSortAge}
      />
    </FormStyled>
  );
}

export default Form;
