import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";

interface Props {
  items: string[];
  checkedItems?: string[];
  onChange: (items: string[]) => void;
}

export default function CheckboxList({ items, checkedItems, onChange }: Props) {
  const [checkedItemsList, setCheckedItems] = useState(checkedItems || []);

  function isChecked(item: string): boolean {
    return checkedItemsList.includes(item);
  }

  function handleChecked(value: string) {
    let newCheckedItemsList: string[] = [];

    if (isChecked(value)) {
      newCheckedItemsList = checkedItemsList.filter((item) => item !== value);
    } else {
      newCheckedItemsList = [...checkedItemsList, value];
    }

    setCheckedItems(newCheckedItemsList);
    onChange(newCheckedItemsList);
  }

  return (
    <FormGroup>
      {items.map((item) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked(item)}
              onClick={() => handleChecked(item)}
            />
          }
          label={item}
          key={item}
          checked={isChecked(item)}
        />
      ))}
    </FormGroup>
  );
}
