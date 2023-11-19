import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useFetchAllDJsQuery } from "../../services/djs";
import DJProfile from "../djs/previewDJprofile";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function DJProfilesPreview() {
  const navigate = useNavigate();
  const { data: DJs, isLoading } = useFetchAllDJsQuery();

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "0.0rem",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: "0.0rem",
        },
      },
    ],
  };

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
    <Box padding={2} className="dj-preview-section">
      <Typography variant="h5" gutterBottom>
        Featured DJs
      </Typography>
      <Box>
        {DJs && DJs?.length > 0 ? (
          <Slider {...sliderSettings}>
            {DJs?.filter((dj) => isDJInfoValid(dj))?.map((dj) => (
              <div
                key={dj?._id}
                style={{
                  border: "2px solid #e0e0e0",
                  borderRadius: "10px",
                }}
              >
                <Card
                  onClick={() => handleDJClick(dj?._id)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <CardActionArea>
                    <DJProfile dj={dj} isPreview={true} />
                  </CardActionArea>
                </Card>
              </div>
            ))}
          </Slider>
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
    </Box>
  );
}

export default React.memo(DJProfilesPreview);
