import {Box, BoxProps} from "@mui/material";
import { styled } from "@mui/system";

const FormContainer = styled((props) => <Box component="form" {...props} />)<BoxProps>({
  minWidth: 400,
  height: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 20,
  margin: '0 auto',
  padding: '50px 40px 20px 40px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  boxShadow: `0px 106px 42px rgba(0, 0, 0, 0.01),
            0px 59px 36px rgba(0, 0, 0, 0.05), 0px 26px 26px rgba(0, 0, 0, 0.09),
            0px 7px 15px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)`,
  borderRadius: '11px',
})

export default FormContainer;