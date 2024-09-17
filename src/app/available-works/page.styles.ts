"use client";
import {styled} from "@mui/material/styles";
import { Paper } from "@mui/material";

export const Item = styled(Paper)(({theme}) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.paper : "#fff",
  ...theme.typography["body2"],
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 4,
  color: theme.palette.text.secondary,
}));

export const ItemDynamic = styled(Paper)(({theme}) => ({
  margin: theme.spacing(2),
}));


