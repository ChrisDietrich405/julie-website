"use client";
import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

// Name
// Phone
// Address
// Order
// {{items}}
// {{totalPrice}}

const ContactForm = () => {
  const handleReceipt = async () => {
    try {
      const templateParams = {
        email: emailRef.current?.value,
        message: messageRef.current?.value,
        // to_name: "Emily",
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
      };
      console.log("hello", templateParams);

      await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
        templateParams,
        process.env.NEXT_PUBLIC_USER_ID as string
      );

      alert("Your message was successfully sent");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    handleReceipt();
  }, []);

  return <></>;
};

export default ContactForm;
