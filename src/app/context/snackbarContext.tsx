"use client";
import React, {createContext, useState,} from "react";
import {Alert, AlertProps, Snackbar, SnackbarProps} from "@mui/material";

type HandleSnackbar = (message: string, options?: SnackbarProps & AlertProps) => void

type SnackbarContext = {
  openError: HandleSnackbar;
  openSuccess: HandleSnackbar;
}

export const SnackbarContext = createContext<SnackbarContext>({
  openError: () => {
  },
  openSuccess: () => {
  }
});

export const SnackbarContextProvider = ({children}: any) => {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<SnackbarProps & AlertProps>({})

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const openError: HandleSnackbar = (message, options) => {


    setConfig({
      message,
      severity: 'error',
      ...options
    })
    setOpen(true);
  }

  const openSuccess: HandleSnackbar = (message, options) => {
    setConfig({
      message,
      severity: 'success',
      ...options
    })
    setOpen(true);
  }


  return (
    <SnackbarContext.Provider value={{openError, openSuccess}}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Somethin is wrong"
      >
        <Alert
          {...config}
        >
          {config.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
