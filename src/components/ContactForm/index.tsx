"use client";
import React, { useState, useRef} from "react";
import { TextField, Button, Stack } from "@mui/material";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const firstNameRef: any = useRef(null);
  const lastNameRef: any = useRef(null);
  const emailRef: any = useRef(null);
  const messageRef: any = useRef(null);

  const handleFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const templateParams = {
        email: emailRef.current?.value,
        message: messageRef.current?.value,
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
        image: '<img src="https://github.com/chrisdietrich405.png">',
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_CONTACT_TEMPLATE_ID as string,
        templateParams,
        process.env.NEXT_PUBLIC_USER_ID as string
      );

      toast.success("Email sent successfully");
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("Email not sent");
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            inputRef={firstNameRef}
            type="text"
            variant="outlined"
            color="secondary"
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            fullWidth
            required
          />
          <TextField
            inputRef={lastNameRef}
            type="text"
            variant="outlined"
            color="secondary"
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            fullWidth
            required
          />
        </Stack>
        <TextField
          inputRef={emailRef}
          type="email"
          variant="outlined"
          color="secondary"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <TextField
          inputRef={messageRef}
          type="message"
          variant="outlined"
          color="secondary"
          label="Message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          fullWidth
          required
          sx={{ mb: 4 }}
          id="outlined-multiline-static"
          multiline
          rows={4}
        />

        <Button type="submit" className="btn btn-large">
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
};

export default ContactForm;
