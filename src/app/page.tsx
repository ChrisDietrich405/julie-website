// for Stripe to add a bank account go to settings, go to business, go to external links
//https://codesandbox.io/embed/jjtrmd?module=/src/Demo.js&fontsize=12

import { Container, Typography } from "@mui/material";
import dynamic from "next/dynamic";

const Slideshow = dynamic(() => import('@/components/Slideshow'))

export default function Home() {
  return (
    <>
      <Slideshow />
      <Container className="main-content">
        <Typography sx={{ textAlign: "center", my: 3 }} component="h5">
          Available Works
        </Typography>

        <Typography sx={{ textAlign: "center", my: 3 }} component="h5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever
          since the 1500s,
        </Typography>
        <Typography sx={{ textAlign: "center", my: 3 }} component="h5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Typography>
      </Container>
    </>
  );
}
