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
  sortedJobsArray: Array<string>;
}) {
  const {
    filterName,
    handleFilterName,
    hasFiltered,
    handleFilterJob,
    handleSortAge,
    sortedJobsArray,
  } = props;

  const [sortAgeArray] = useState<Array<string>>(["Ascending", "Descending"]);

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
        data-testid="filter-jobs"
      />
      <Dropdown
        labelText="Sort by age"
        optionsList={sortAgeArray}
        handleChange={handleSortAge}
        data-testid="sort-age"
      />
    </FormStyled>
  );
}

export default Form;
