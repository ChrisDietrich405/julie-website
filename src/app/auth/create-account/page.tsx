import React from "react";
import {Box, Container} from "@mui/material";

import styles from "./styles.module.css";
import CreateAccountForm from "./CreateAccountForm";

const CreateAccount = () => {

  return (
    <Box className={styles.container_background}>
      <Container
        className={`"main-content" `}
        maxWidth="xl"
      >
        <CreateAccountForm/>
      </Container>
    </Box>
  );
};

export default CreateAccount;
