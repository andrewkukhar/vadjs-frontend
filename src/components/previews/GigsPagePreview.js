import React from "react";
import { Box, Typography, List, Button } from "@mui/material";
import { useFetchAllDjUpcomingEventsQuery } from "../../services/djs";
import { useNavigate } from "react-router-dom";

export default function GigsPagePreview() {
  const navigate = useNavigate();
  const { data: djs, isLoading } = useFetchAllDjUpcomingEventsQuery();

  if (isLoading) {
    return (
      <Typography variant="h6" align="center">
        Loading...
      </Typography>
    );
  }

  if (!djs?.length) {
    return (
      <Typography variant="h6" align="center">
        No DJs or gigs available at the moment.
      </Typography>
    );
  }

  const topEvents = djs?.flatMap((dj) => dj.upcomingEvents).slice(0, 3);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Upcoming Gigs
      </Typography>
      <List>
        {topEvents?.map((event) => (
          <div key={event._id}>
            <Typography variant="body1">
              {event.name} - {new Date(event.date)?.toLocaleDateString()}
            </Typography>
          </div>
        ))}
      </List>
      <Button variant="text" onClick={() => navigate("/gigs")}>
        See All Gigs
      </Button>
    </Box>
  );
}
