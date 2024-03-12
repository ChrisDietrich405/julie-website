import React from "react";
import Image from "next/image";
import { Container, Grid } from "@mui/material";
import Typography from "@mui/joy/Typography";

import ContactForm from "../../components/ContactForm";

const Contact = () => {
  return (
    <Container className="main-content">
      <Typography level="h1" component="h1">
        Contact
      </Typography>
      <Typography sx={{ margin: 2, textAlign: "center" }} component="p">
        Simply fill out the form and I'll be in touch soon.
      </Typography>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={6} justifyContent="center">
          <Image
            width={500}
            height={500}
            alt="Picture of Julie"
            src="/images/art1.jpg"
          />
        </Grid>
        <Grid item xs={6}>
          <ContactForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
