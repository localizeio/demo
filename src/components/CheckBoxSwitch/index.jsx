import React from "react";
import Switch from "react-switch";

const CheckBoxSwitch = ({onHandleChange, isChecked}) => {

  return (
    <Switch
      onChange={onHandleChange}
      checked={isChecked}
      uncheckedIcon={false}
      checkedIcon={false}
      handleDiameter={24}
      onColor={"#FFCD19"}
      boxShadow={"0px 1px 1px #CEA100"}
      height={32}
      width={58}
    />
  );

}

export default CheckBoxSwitch;
