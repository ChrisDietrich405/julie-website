import {Container, Grid, Typography} from "@mui/material";
import {AvailableWorksApi} from "@/services";
import CardImage from "@/components/CardImage/CardImage";

async function getData() {
  const {data} = await AvailableWorksApi.getAll();

  return data;
}

export const dynamic = 'force-dynamic';

export default async function Page() {
  const data = await getData();

  return (
    <Container disableGutters>
      <Typography
        sx={{textAlign: "center", width: "100%", mb: "10px"}}
        variant="h1"
      >
        Available Works
      </Typography>
      <Grid
        container
        rowSpacing={5}
        columnSpacing={{xs: 1, sm: 2, md: 3}}
        marginTop={2}
      >
        {data?.map((item: any, index: any) => {
          return (
            <Grid key={`firstArrayIndex ${index}`} item xs={12} md={6}>
              <CardImage data={item}/>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
