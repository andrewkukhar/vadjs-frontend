import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useFetchAllDJsQuery } from "../../services/djs";
import DJProfile from "../djs/previewDJprofile";

function DJProfilesPreview() {
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
    <div className="djs-preview">
      <Typography variant="h5" gutterBottom>
        Featured DJs
      </Typography>
      <Box
        className="djs-preview-body"
        sx={{
          display: "flex",
          overflowX: "auto",
          padding: "1rem 0",
          gap: "1rem",
        }}
      >
        {DJs && DJs?.length > 0 ? (
          DJs?.filter((dj) => isDJInfoValid(dj)).map((dj) => (
            <Box
              key={dj?._id}
              sx={{
                minWidth: "200px",
                flex: "0 0 auto",
                border: "2px solid #e0e0e0",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => handleDJClick(dj?._id)}
            >
              <DJProfile dj={dj} isPreview={true} />
            </Box>
          ))
        ) : (
          <Typography variant="body2">
            No DJs available at the moment.
          </Typography>
        )}
      </Box>
      <Button
        sx={{ mt: "1.5rem" }}
        variant="text"
        onClick={() => navigate("/alldjs")}
      >
        See All DJs
      </Button>
    </div>
  );
}

export default React.memo(DJProfilesPreview);
