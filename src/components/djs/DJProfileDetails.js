import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";
import { formatDate } from "../../services/utils";

function DJProfileDetails({ dj, isLoading }) {
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!dj) return null;
  const imageUrl = dj?.image?.url || "/icons/djicon.png";

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding={2}
    >
      <img
        alt={dj.name || "DJ"}
        src={imageUrl}
        style={{
          width: "100%",
          maxWidth: "30rem",
          height: "auto",
          padding: "1rem",
          margin: "1rem",
          objectFit: "cover",
        }}
      />
      <Typography variant="h4" component="h1" gutterBottom>
        {dj?.name || "Unknown DJ"}
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        {dj.genres && Array.isArray(dj?.genres) ? dj.genres.join(", ") : ""}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {dj?.fullBio && dj?.fullBio.length > 150
          ? dj?.fullBio.substring(0, 147) + "..."
          : dj?.fullBio}
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Years Active: {dj?.yearsActive}
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Upcoming Events:
      </Typography>
      <List>
        {dj?.upcomingEvents && dj?.upcomingEvents.length > 0 ? (
          dj?.upcomingEvents.map((event, index) => (
            <ListItem key={index}>
              {event.name} on {formatDate(event.date)}
            </ListItem>
          ))
        ) : (
          <Typography variant="body2">No upcoming events.</Typography>
        )}
      </List>
      <Typography variant="h6" component="h3" gutterBottom>
        Follow me on:
      </Typography>
      <List>
        {dj?.socialMediaLinks &&
        Object.keys(dj?.socialMediaLinks).length > 0 ? (
          Object.entries(dj?.socialMediaLinks).map(([platform, url]) => (
            <ListItem key={platform}>
              <MuiLink href={url} target="_blank" rel="noopener noreferrer">
                {platform}
              </MuiLink>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2">
            No social media links available.
          </Typography>
        )}
      </List>
    </Box>
  );
}

export default React.memo(DJProfileDetails);
