import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
} from "@mui/material";
import { useSendBookEventEmailMutation } from "../../services/emails";
import { useSnackbar } from "notistack";

export default function ContactUsPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [sendEmail] = useSendBookEventEmailMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const isValid = () => {
    let valid = true;
    let tempErrors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    for (const key in formData) {
      if (!formData[key]) {
        tempErrors[key] = "This field is required";
        valid = false;
      }
    }

    if (formData.message.length < 25) {
      tempErrors.message = "Message should be at least 25 characters";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValid()) {
      const result = await sendEmail({ formData });
      if (result.data) {
        enqueueSnackbar("Form submitted!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        console.error("FAILED...");
        alert("Failed to send email. Please try again.");
      }
    }
  };

  const customTextFieldStyle = {
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& label": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiFormHelperText-root": {
      color: "white",
    },
    "& textarea": {
      color: "white",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "rgba(255, 255, 255, 0.7)",
    },
    // Override autofill styles for inputs
    "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active":
      {
        "-webkit-box-shadow": "0 0 0 100px #2b6c6f inset", // Replace with your desired background color
        "-webkit-text-fill-color": "white",
        transition: "background-color 5000s ease-in-out 0s",
      },
    // Override autofill styles for textareas
    "& textarea:-webkit-autofill, & textarea:-webkit-autofill:hover, & textarea:-webkit-autofill:focus, & textarea:-webkit-autofill:active":
      {
        "-webkit-box-shadow": "0 0 0 100px #2b6c6f inset", // Replace with your desired background color
        "-webkit-text-fill-color": "white",
        transition: "background-color 5000s ease-in-out 0s",
      },
  };

  return (
    <div className="contact-us">
      <Typography variant="h4">Contact Us</Typography>
      <Typography paragraph>
        If you have any questions or concerns, please contact us using the form
        below:
      </Typography>
      <form onSubmit={handleSubmit} className="contact-us-body">
        <TextField
          fullWidth
          required
          error={Boolean(errors.name)}
          helperText={errors.name}
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          sx={customTextFieldStyle}
        />
        <TextField
          fullWidth
          required
          error={Boolean(errors.email)}
          helperText={errors.email}
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          sx={customTextFieldStyle}
        />
        <TextField
          fullWidth
          required
          error={Boolean(errors.subject)}
          helperText={errors.subject}
          margin="normal"
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          sx={customTextFieldStyle}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          required
          error={Boolean(errors.message)}
          helperText={errors.message}
          margin="normal"
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          sx={customTextFieldStyle}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
          fullWidth
        >
          Submit
        </Button>
      </form>
      <Box mt={4}>
        <Typography variant="h6" mb={2}>
          Other ways to contact us:
        </Typography>
        <Typography paragraph>Phone: (236) 995-1120</Typography>
        <Typography paragraph>Address: Vancouver, BC, Canada</Typography>
        <Link
          href="https://www.akweb.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.akweb.dev
        </Link>
      </Box>
    </div>
  );
}
