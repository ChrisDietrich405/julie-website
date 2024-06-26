import {TypographyOptions} from "@mui/material/styles/createTypography";
import {Roboto_Mono} from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
  weight: [ '400', '500', '600', '700' ]
});

export const textStyles: TypographyOptions  = {
  fontFamily: robotoMono.style.fontFamily,
  body1: {
    fontSize: '1rem',
    lineHeight: 1.5,
    fontWeight: 400,
  },

  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.4,
    fontWeight: 400,
  },

  h1: {
    fontSize: '2rem',
    lineHeight: 1.2,
    fontWeight: 500,
  },

  h2: {
    fontSize: '1.5rem',
    lineHeight: 1.3,
    fontWeight: 500,
  },

  h3: {
    fontSize: '1.25rem',
    lineHeight: 1.4,
    fontWeight: 500,
  },

  h4: {
    fontSize: '1rem',
    lineHeight: 1,
    fontWeight: 500,
  },

  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.4,
    fontWeight: 400,
  },
};