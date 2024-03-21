import Image from "next/image";
import { Container } from "@mui/joy";
import { Grid, Typography, TextField } from "@mui/material";
import AddToCart from "@/components/AddToCart";
import axios from "axios";

const translateDynamoDBObject = (dbObject) => {
  return {
    price: parseFloat(dbObject.price.N),
    measurements: dbObject.measurements.S,
    image: dbObject.image.S,
    ID: dbObject.ID.S,
    title: dbObject.title.S,
  };
};

async function getData(id) {
  const response = await axios.get(
    `https://lq9oqysp3l.execute-api.us-east-1.amazonaws.com/dev/individual-work?id=${id}`,
    {
      headers: {
        "x-api-key": process.env.AWS_API_KEY,
      },
    }
  );

  const individualWork = translateDynamoDBObject(response.data.body);

  return individualWork;
}

export default async function AvailableWorksDetails({ params: { id } }) {
  const data = await getData(id);

  return (
    <Container className="main-content">
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ width: "100%" }}
      >
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
          <Image width={500} height={500} alt="slideshow" src={data.image} />
        </Grid>
        <Grid item xs={6} display="flex" flexDirection="column">
          <Typography sx={{ marginBottom: 2 }} variant="h3" component="h3">
            {data.title}
          </Typography>
          <Typography sx={{ marginBottom: 2 }} variant="h4" component="h2">
            ${data.price}
          </Typography>
          <Typography sx={{ marginBottom: 2 }} component="p">
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s,
          </Typography>
          <AddToCart data={data} />
        </Grid>
      </Grid>
    </Container>
  );
}
