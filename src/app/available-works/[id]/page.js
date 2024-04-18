import Image from "next/image";
import {Container} from "@mui/joy";
import {Grid, Typography} from "@mui/material";
import AddToCart from "@/components/AddToCart";
import {AvailableWorksApi} from "../../../services";

async function getData(id) {
  try {
    const {data} = await AvailableWorksApi.getOne(id);

    return data;
  } catch (error) {
    console.log('Something is wrong!')
  }
}

export default async function AvailableWorksDetails({params: {id}}) {
  const data = await getData(id);

  return (
    <Container sx={{margin: "60px"}}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{xs: 1, sm: 2, md: 3}}
        sx={{width: "100%"}}
      >
        <Grid item xs={6} sx={{display: "flex", justifyContent: "end"}}>
          <Image width={333} height={333} alt="slideshow" src={data.image}/>
        </Grid>
        <Grid
          item
          xs={6}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography sx={{marginBottom: 2}} variant="h4" component="h2">
            {data.title}
          </Typography>
          <Typography sx={{marginBottom: 2}} variant="h4" component="h2">
            ${data.price}
          </Typography>
          <Typography sx={{marginBottom: 2}} variant="h5" component="h5">
            {data.measurements}
          </Typography>
          <Typography sx={{marginBottom: 2}} component="p">
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s,
          </Typography>
          <AddToCart id={data._id}/>
        </Grid>
      </Grid>
    </Container>
  );
}
