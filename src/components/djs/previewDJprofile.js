import React from "react";
import { Box, Typography } from "@mui/material";

function PreviewDJprofile({ dj, isPreview }) {
  if (!dj) return null;
  const imageUrl = dj?.image?.url || "/icons/djicon.png";

  function formatGenres(genres) {
    if (!genres || !genres.length) return "";
    return genres.slice(0, 3).join(", ");
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        flexGrow: 1,
        height: "100%",
        fontSize: "calc(10px + 2vmin)",
      }}
    >
      <img
        alt={dj?.name}
        src={imageUrl}
        style={{
          width: "calc(65px + 25vmin)",
          height: "calc(65px + 25vmin)",
          padding: "1rem",
          margin: "1rem",
          objectFit: "cover",
        }}
      />
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        fontSize="calc(10px + 2vmin)"
      >
        {dj?.name}
      </Typography>
      {!isPreview && (
        <>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            fontSize="calc(7px + 1vmin)"
          >
            {formatGenres(dj?.genres)}
          </Typography>
          <Typography variant="body1" gutterBottom fontSize="calc(7px + 1vmin)">
            {dj?.bio}
          </Typography>
        </>
      )}
    </Box>
  );
}

export default React.memo(PreviewDJprofile);
