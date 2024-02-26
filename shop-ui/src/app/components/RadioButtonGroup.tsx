/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface Props {
    options: any[];
    onChange: (event: any) => void;
    selectedValue: string;
}

export default function RadioButtonGroup({ options, onChange, selectedValue }: Props) {
  return (
    <FormControl component="fieldset">
      <RadioGroup onChange={onChange} value={selectedValue}>
        {options.map((opt) => (
          <FormControlLabel
            value={opt.value}
            control={<Radio />}
            label={opt.label}
            key={opt.value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
