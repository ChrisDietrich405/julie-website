import React from "react";
import Image from "next/image";
import { Container, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

const About = () => {
  return (
    <Container className="main-content">
      <Typography
        sx={{ textAlign: "center", width: "100%", mb: "10px" }}
        level="h1"
        component="h1"
      >
        About Dr. Dietrich Eisler
      </Typography>
      <Grid container spacing={6} sx={{ mb: 3 }}>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Image
            src="/images/art1.webp"
            alt="about picture"
            width={350}
            height={350}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: "20px",
            width: "30%",
          }}
        >
          <Typography component="p" sx={{ mb: 3 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Typography>
          <Typography component="p" sx={{ mb: 3 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Typography>
          <Typography component="p" sx={{ mb: 3 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Typography>
        </Grid>
      </Grid>
      <Typography component="p">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. Lorem Ipsum is simply dummy
        text of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown
        printer took a galley of type and scrambled it to make a type specimen
        book.
      </Typography>
    </Container>
  );
};

export default About;
