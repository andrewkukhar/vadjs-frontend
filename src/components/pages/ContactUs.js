import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Link } from '@mui/material';
import emailjs from 'emailjs-com';
import { useSnackbar } from 'notistack';

export default function ContactUsPage() {
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const isValid = () => {
        let valid = true;
        let tempErrors = {
            name: '',
            email: '',
            subject: '',
            message: ''
        };

        for (const key in formData) {
            if (!formData[key]) {
                tempErrors[key] = 'This field is required';
                valid = false;
            }
        }

        if (formData.message.length < 25) {
            tempErrors.message = 'Message should be at least 25 characters';
            valid = false;
        }

        setErrors(tempErrors);
        return valid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isValid()) {
            emailjs.send('service_vd71sm8', 'template_qv7prmf', formData, 'agJWxeoZ_cB9hOqCK')
                .then((response) => {
                    enqueueSnackbar('Form submitted!');
                    setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        message: ''
                    });
                })
                .catch((err) => {
                    console.error('FAILED...', err);
                    alert('Failed to send email. Please try again.');
                });
        }

    };
    
    return (
      <Container maxWidth="xs" >
        <Box
          sx={{ width: '100%', padding: '2rem 0.5rem .5rem 0rem' }}
        >
            <Typography variant="h4">Contact Us</Typography>
            <Typography paragraph>If you have any questions or concerns, please contact us using the form below:</Typography>

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
                <Typography variant="h6">Other ways to contact us:</Typography>
                <Typography paragraph>Email: andrewrisedj@gmail.com</Typography>
                <Typography paragraph>Phone: (236) 995-1120</Typography>
                <Typography paragraph>Address: Great Vancouver Area, BC Canada</Typography>
                <Link href="https://www.akweb.dev/" target="_blank" rel="noopener noreferrer">
                    www.akweb.dev
                </Link>
            </Box>
        </Box>
      </Container>
    );
}
