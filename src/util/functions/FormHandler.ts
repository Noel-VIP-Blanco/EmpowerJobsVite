import React from "react"

interface CheckboxState {
    react: boolean;
    angular: boolean;
    javascript: boolean;
    java: boolean;
    database:  boolean;
    photography: boolean;
}

interface SkillsList extends Array<string> {}

interface IHandleCheckboxChange {
    event : React.ChangeEvent<HTMLInputElement>,
    setCheckboxes : React.Dispatch<React.SetStateAction<CheckboxState>>,
    setSkills : React.Dispatch<React.SetStateAction<SkillsList>>
}
interface IHandleRadioChange {
    event : React.ChangeEvent<HTMLInputElement>,
    setDisability : React.Dispatch<React.SetStateAction<string>>
}
//METHODS

export const handleCheckboxChange = ({event, setCheckboxes, setSkills} : IHandleCheckboxChange) => {
    const { name, checked } = event.target;
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));

    if (checked) {
      setSkills((prevList) => [...prevList, name]);
    } else {
      setSkills((prevList) => prevList.filter((item) => item !== name));
    }
  }

export const handleRadioChange = ({event, setDisability}: IHandleRadioChange) => {
    setDisability(event.target.value)
}

