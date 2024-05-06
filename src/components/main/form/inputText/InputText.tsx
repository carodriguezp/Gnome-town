import styled from "styled-components";
import { Input, Label, SectionForm } from "../../../../styles/SectionForm";

type InputTextType = {
  value: string;
  handleChange: (x: string) => void;
  placeholder: string;
  hasFiltered: boolean;
};

const ErrorText = styled.span`
  color: darkred;
  font-size: 0.8rem;
  width: 100%;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 1.3rem;
    position: absolute;
    top: 50%;
  }

  @media (min-width: 1024px) {
    top: 30%;
  }
`;

function InputText({
  value,
  handleChange,
  placeholder,
  hasFiltered,
}: InputTextType) {
  return (
    <>
      <SectionForm>
        <Label htmlFor="name">Filter by Name</Label>

        <Input
          data-testid="input"
          type="text"
          name="name"
          placeholder={placeholder}
          value={value}
          onChange={(ev) => handleChange(ev.target.value)}
        />
      </SectionForm>
      {!hasFiltered && value && (
        <ErrorText data-testid="error-message">
          There is no gnome matching the word "{value}"
        </ErrorText>
      )}
    </>
  );
}

export default InputText;
