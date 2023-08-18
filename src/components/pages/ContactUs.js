import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Link } from '@mui/material';

export default function ContactUsPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Handle form submission (send to an API or email service)
        alert('Form submitted!');
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
      <Container maxWidth="xs" >
        <Box
          sx={{ width: '100%', padding: '2rem 1rem 1rem 1rem' }}
        >
            <Typography variant="h4">Contact Us</Typography>
            <Typography paragraph>If you have any questions or concerns, please contact us using the form below:</Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <TextField
                    fullWidth
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
