import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DJProfilesPreview from "../previews/DJProfilesPreview";
import GigsPagePreview from "../previews/GigsPagePreview";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        Welcome to Vancouver DJs club!
      </Typography>
      <Typography paragraph>
        Explore the best DJs in Vancouver, find upcoming gigs, learn more about
        us, and stay updated with our NewsBlog.
      </Typography>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          NewsBlog
        </Typography>
        <Typography paragraph>
          Stay tuned for the latest updates, DJ interviews, event announcements,
          and more in our NewsBlog!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/newsblog")}
        >
          Visit NewsBlog
        </Button>
      </Box>
      <DJProfilesPreview />
      <GigsPagePreview />
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography paragraph>
          You can include a brief summary from AboutUsPage here or leave it as
          it is.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/aboutus")}
        >
          Learn More
        </Button>
      </Box>
    </Box>
  );
}
