import { CancelButton, EditButton } from "ui/Buttons";
import {
  DefaultInput,
  InputEdit,
  InputField,
  InputLabel
} from "ui/Forms";
import React, { useState } from 'react';

import { UpdateButton } from "./EditInputStyles";

export default function EditInput(props) {
  const [toggleEdit, setToggleEdit] = useState(false);
  console.log(props)
  let defaultValue = <DefaultInput>{props.value}</DefaultInput>;
  if (toggleEdit) {
    if (props.password) {
      defaultValue = (
        <>
          <InputField type="password" value={props.value}/>
          <InputField type="password" placeholder="New Password" />
          <InputField type="password" placeholder="Confirm Password" />
        </>
      );
    }
    else {
      defaultValue = (
        <InputField
          {...props}
          type="text"/>
      );
    }
  }

  return (
    <>
      <InputEdit>
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
      </InputEdit>
      {toggleEdit && (
        <UpdateButton>Update {props.inputLabel}</UpdateButton>
      )}
    </>
  )
}

