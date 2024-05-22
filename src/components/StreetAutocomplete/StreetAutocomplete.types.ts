import {TextFieldProps} from "@mui/material/TextField";
import {AutocompleteProps} from "@mui/material/Autocomplete";


type AutocompleteTypes = Omit<AutocompleteProps<any, any, any, any>, 'renderOption' | 'renderInput' | 'options' | 'onChange'>;

export type StreetAutocompleteProps = {
  inputProps?: TextFieldProps;
  onChange?: (data: any) => void;
} &
  AutocompleteTypes