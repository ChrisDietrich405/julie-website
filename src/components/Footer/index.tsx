import {Box, Button, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import styles from "./styles.module.css";

const index = () => {
  const copyrightYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div className={styles.wrapper}>
      <Container>
        {/* <Typography component="h4" sx={{textAlign: "center", mb: 4}}>
          Sign up to my newsletter for exclusive updates
        </Typography>
        <Box className={styles.input_wrapper}
          
        >
          <TextField id="outlined-basic-name" label="Name" variant="outlined"/>
          <TextField id="outlined-basic-email" label="Email" variant="outlined"/>
          <Button className="btn">Sign Up</Button>
        </Box>
        <Box>
          <Typography sx={{textAlign: "center", mt: 4}}>
            Sign up to my newsletter for exclusive updates
          </Typography>
        </Box> */}
        {/* <Box
          sx={{
            gap: 3,
            display: "flex",
            justifyContent: "center",
            border: "none",
          }}
          aria-label="outlined primary button group"
        >
          <Button>Shipping</Button>
          <Button>FAQs</Button>
          <Button>Testimonials</Button>
        </Box> */}
        <Typography sx={{textAlign: "center"}}>
          Copyright © JustArt {copyrightYear()}
        </Typography>
      </Container>
    </div>
  );
};

export default index;
