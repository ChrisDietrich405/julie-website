import Image from "next/image";
import { Box, Container, Typography, Stack} from "@mui/material";
import AddToCart from "@/app/components/AddToCart";
import { AvailableWorksApi } from "../../../services";

async function getData(id: string | number) {
  try {
    const { data } = await AvailableWorksApi.getOne(id);

    return data;
  } catch (error) {
    console.log("Something is wrong!");
  }
}

export default async function AvailableWorksDetails({ params: { id } } : { params: { id: string}}) {
  const data = await getData(id);

  if ( !data ) {
    return <>error</>;
  }

  return (
    <Container>
      <Stack direction="row" columnGap={3} justifyContent="center">
        <Image
          width={333}
          height={333}
          alt={data.title}
          src={data.image}
          style={{flex: 0.4}}
        />

        <Stack
          flex={0.5}
          rowGap={2}
        >
          <Typography sx={{ marginBottom: 2 }} variant="h4" component="h2">
            {data.title}
          </Typography>
          <Typography sx={{ marginBottom: 2 }} variant="h4" component="h2">
            ${data.price}
          </Typography>
          <Typography sx={{ marginBottom: 2 }} variant="h5" component="h5">
            {data.measurements}
          </Typography>
          <Typography sx={{ marginBottom: 2 }} component="p">
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s,
          </Typography>

          <AddToCart id={data._id} sx={{ width: 'fit-content' }} />
        </Stack>
      </Stack>
    </Container>
  );
}
