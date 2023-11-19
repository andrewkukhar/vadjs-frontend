import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
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

  return (
    <Container maxWidth="xs">
      <Box sx={{ width: "100%", padding: "2rem 0.5rem .5rem 0rem", mb: 3 }}>
        <Typography variant="h4">Contact Us</Typography>
        <Typography paragraph>
          If you have any questions or concerns, please contact us using the
          form below:
        </Typography>

        <form onSubmit={handleSubmit}>
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
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
        <Box mt={4}>
          <Typography variant="h6" mb={2}>
            Other ways to contact us:
          </Typography>
          <Typography paragraph>Phone: (236) 995-1120</Typography>
          <Typography paragraph>
            Address: Great Vancouver Area, BC Canada
          </Typography>
          <Link
            href="https://www.akweb.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.akweb.dev
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
