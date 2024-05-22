import {useEffect, useMemo, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import {useGetAddress} from "@/app/hooks";
import {StreetAutocompleteProps} from "@/components/StreetAutocomplete/StreetAutocomplete.types";

const StreetAutocomplete: React.FC<StreetAutocompleteProps> = ({inputProps, onChange, ...props}) => {
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [ search, setSearch ] = useState('');

  const { data, isFetching, isFetched } = useGetAddress(search)

  const options = data?.data ?? []

  const getAddress = useMemo(
    () =>
      debounce(
        (input) => {
          setSearch(input);
        },
        600,
      ),
    [],
  );

  useEffect(() => {
    getAddress(inputValue)
  }, [inputValue]);

  useEffect(() => {
    onChange && onChange(value)
  }, [value]);

  return (
    <Autocomplete
      {...props}
      freeSolo
      autoComplete
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.display_name
      }
      options={options}
      openOnFocus={false}
      loading={isFetching || !isFetched}
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      sx={{
        backgroundColor: 'white',
        ' & .MuiInputBase-root': {
          padding: 0,
          border: '2px solid #000',
          borderRadius: '7px',
          boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.5)',
          outlined: 'none'
        }
      }}
      onChange={(_, value) => setValue(value)}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} {...inputProps} fullWidth />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props} key={`autocomplete-item- ${props.id}`}>
            <Typography>{option.display_name}</Typography>
          </li>
        );
      }}
    />
  );
}

export default StreetAutocomplete;
