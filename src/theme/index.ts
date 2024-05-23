import {createTheme, Theme} from "@mui/material";
import {textStyles} from "@/theme/textStyles";

export const theme: Theme = createTheme({
  typography: textStyles,
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          backgroundColor: '#f5f5f5'
        }
      }
    }
  }
})