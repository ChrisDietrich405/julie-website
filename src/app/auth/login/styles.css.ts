"use client"

import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const BackgroundBox = styled(Box)({
  background: 'no-repeat center 0 / cover url("/images/art1.webp")',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: 'calc(100dvh - 64px)',
  padding: 20,
})