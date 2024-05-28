import Image from "next/image";
import Link from "next/link";
import {Box, Card, CardContent, Chip, Stack, Typography} from "@mui/material";
import {currencyFormat} from "@/helpers";
import {IAvailableWork} from "@/models";
import { AddShoppingCart } from '@mui/icons-material'
import AddToCart from "@/app/components/AddToCart";

type CardImageProps = {
  data: IAvailableWork
}

const CardImage: React.FC<CardImageProps> = ({ data}) => (
  <Link href={`/available-works/${data._id}`} style={{ textDecoration: 'none', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto'}}>
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: '1px 0px 3px 1px rgba(0,0,0,0.2)',
        '&:hover': {
          boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 3px, rgba(0, 0, 0, 0.2) 1px 4px 10px',
        }
      }}
    >
      <CardContent
        sx={{
          paddingTop: 0,
          paddingX: 0,
        }}
      >
        <Box height={320} overflow="hidden" position="relative">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            alt={data.title}
            src={data.image}
            style={{
              width: "100%",
              height: "auto",
              position: "relative",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          <Chip
            variant="filled"
            color="info"
            label={data.measurements}
            sx={{ position: 'absolute', top: 20, right: 20 }} />
        </Box>

        <Stack
          direction="row"
          padding={2}
          paddingBottom={0}
          justifyContent="space-between"
        >
          <Stack rowGap={1}>
            <Typography variant="h4" fontWeight={500}>{data.title}</Typography>
            <Typography variant="body1" >{currencyFormat(data.price)}</Typography>
          </Stack>

          <AddToCart
          id={data._id}
          variant="contained"
          size="small"
          color="secondary"
          endIcon={<AddShoppingCart />}
          sx={{
            borderRadius: 3
          }}
          />
        </Stack>
      </CardContent>
    </Card>
  </Link>
);

export default CardImage;