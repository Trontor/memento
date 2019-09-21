import { ButtonSecondary, CancelButton, EditButton } from "ui/Buttons";
import {
  DefaultInput,
  EditInput,
  FormSection,
  InputField,
  InputLabel
} from "ui/Forms";
import React, { useState } from 'react';

export default function EditForm(props) {
  const [toggleEdit, setToggleEdit] = useState(false);

  let defaultValue = <DefaultInput>{props.value}</DefaultInput>;
  if (toggleEdit) {
    defaultValue = (
      <InputField type="text" value={props.value}/>
    );
  }

  return (
    <FormSection>
      <EditInput>
        <div>
          <InputLabel>
            {props.inputLabel}
          </InputLabel>
          {defaultValue}
        </div>
        {!toggleEdit ? (
          <EditButton size="25px" onClick={() => setToggleEdit(!toggleEdit)}/>
        ):
          <CancelButton size="25px" onClick={() => setToggleEdit(!toggleEdit)}/>
        }
      </EditInput>
    </FormSection>
  )
}

