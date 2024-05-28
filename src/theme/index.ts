"use client"
import {createTheme, Theme} from "@mui/material";
import {textStyles} from "@/theme/textStyles";

export const theme: Theme = createTheme({
  typography: textStyles,
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: 30,
          paddingBottom: 50
        }
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          backgroundColor: '#f5f5f5'
        }
      }
    }
  }
})