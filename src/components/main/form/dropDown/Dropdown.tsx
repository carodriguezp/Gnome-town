import { Label, SectionForm, Select } from "../../../../styles/SectionForm";

function Dropdown({
  labelText,
  optionsList,
  handleChange,
  ...rest
}: {
  labelText: string;
  optionsList: string[];
  handleChange: (x: string) => void;
}) {
  return (
    <SectionForm>
      <Label htmlFor={labelText}>{labelText}</Label>

      <Select
        name={labelText}
        onChange={(ev) => handleChange(ev.target.value)}
        {...rest}
      >
        {optionsList.map((option, i) => (
          <option value={option} key={i}>
            {option}
          </option>
        ))}
      </Select>
    </SectionForm>
  );
}

export default Dropdown;
