import React from 'react';
import { Typography, Container, Box, Link } from '@mui/material';

export default function AboutUsPage() {
    return (
        <Container maxWidth="md">
            <Box mt={5} mb={5}>
                <Typography variant="h4" gutterBottom>
                    About Project
                </Typography>

                <Typography paragraph>
                    Welcome to Vancouver DJs club, the one-stop digital hub for all of Vancouver's talented DJs. Our mission is to bring visibility and connectivity to the local DJ scene.
                </Typography>

                <Typography paragraph>
                    In the vibrant city of Vancouver, the music scene thrives with an eclectic mix of genres and talents. However, we recognized a gap - DJs, the unsung heroes who set the mood and pace for countless events, lacked a centralized platform to showcase their skills, and connect with potential clients, promoters, and music enthusiasts.
                </Typography>

                <Typography paragraph>
                    That's where we come in. Our platform is designed to:
                </Typography>

                <ul>
                    <Typography component="li" paragraph>
                        <strong>Showcase Profiles:</strong> Each DJ can set up a comprehensive profile that includes their name, genres they specialize in, images, and even embedded videos and audio to give visitors a taste of their style.
                    </Typography>
                    <Typography component="li" paragraph>
                        <strong>Connect with Audiences:</strong> With direct links to social media and contact information, listeners can easily follow and connect with their favorite DJs.
                    </Typography>
                    <Typography component="li" paragraph>
                        <strong>Promote Events:</strong> DJs can share their upcoming events, allowing fans to keep up with where they'll be playing next.
                    </Typography>
                </ul>

                <Typography paragraph>
                    Whether you're a promoter seeking the perfect DJ for your next event, a music enthusiast looking for fresh tunes, or just someone who wants to explore the local DJ scene, Vancouver DJ Central is the place for you.
                </Typography>

                <Typography paragraph>
                    We believe in the power of music to connect, inspire, and uplift. Join us in celebrating and supporting Vancouver's DJ community. Explore, discover, and dance to the beats of the city's best.
                </Typography>

                <Box mt={4}>
                    <Typography variant="h6">Get Involved:</Typography>
                    <Typography paragraph>
                        Are you a DJ looking to create a profile? Or do you have suggestions on how we can improve? <Link href="/contactus">Contact us</Link> and let's make magic together!
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}
