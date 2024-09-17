import React from "react";
import Image from "next/image";
import { Container, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

import ContactForm from "../../components/ContactForm";

const Contact = () => {
  return (
    <Container className="main-content">
      <Typography
        sx={{ textAlign: "center", width: "100%", mb: "10px" }}
        variant="h1"
      >
        Contact
      </Typography>
      <Typography sx={{ margin: 2, textAlign: "center" }} component="p">
        Simply fill out the form and I&apos;ll be in touch soon.
      </Typography>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid item xs={12} justifyContent="center">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            alt="picture of art"
            src="/images/art1.webp"
            style={{
              width: "100%",
              height: "auto",
              position: "relative",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <ContactForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
