import { useState } from "react";

export default function useDate(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  const onValueChangeHandler = (data) => {
    const date = new Date(data.$y, data.$M , data.$D)

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    setValue(formattedDate);
  };

  return [value, onValueChangeHandler];
}