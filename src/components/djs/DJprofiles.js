import React from "react";
import { Box, Grid, Card, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFetchAllDJsQuery } from "../../services/djs";
import PreviewDJprofile from "./previewDJprofile";
import { CircularProgress } from "@mui/material";

function DJProfiles() {
  const navigate = useNavigate();
  const { data: DJs, isLoading } = useFetchAllDJsQuery();

  function isDJInfoValid(dj) {
    return dj && dj?.name;
  }

  const handleDJClick = (djId) => {
    navigate(`/dj/${djId}`);
  };

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

  return (
    <Box padding={2}>
      <Grid container spacing={3}>
        {DJs?.filter((dj) => isDJInfoValid(dj)).map((dj) => (
          <Grid item xs={12} sm={6} md={4} key={dj?._id}>
            <Card
              onClick={() => handleDJClick(dj?._id)}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                fontSize: "calc(7px + 2vmin)",
              }}
            >
              <CardActionArea>
                <PreviewDJprofile dj={dj} isPreview={false} />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default React.memo(DJProfiles);
