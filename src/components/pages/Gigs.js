import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  TextField,
  styled,
} from "@mui/material";
import {
  StaticDatePicker,
  LocalizationProvider,
  PickersDay,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useFetchAllDjUpcomingEventsQuery } from "../../services/djs";

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#0000ff",
    color: "#000",
  },
  "&.MuiPickersDay-dayHighlight": {
    backgroundColor: "#D3D3D3",
    color: "#000",
  },
}));

const GigDay = (props) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !outsideCurrentMonth &&
    highlightedDays.includes(day.toISOString().split("T")[0]);

  return (
    <HighlightedDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      selected={isSelected}
      className={isSelected ? "MuiPickersDay-dayHighlight" : ""}
    />
  );
};

export default function GigsPage() {
  const { data: djs, isLoading } = useFetchAllDjUpcomingEventsQuery();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredDJs = selectedDate
    ? djs?.filter((dj) => {
        return dj.upcomingEvents.some(
          (event) =>
            new Date(event?.date)?.toISOString().split("T")[0] ===
            selectedDate?.toISOString().split("T")[0]
        );
      })
    : djs;

  const displayDJs = filteredDJs?.filter(
    (dj) => dj?.upcomingEvents?.length > 0
  );
  const eventDates = [];
  djs?.forEach((dj) => {
    dj?.upcomingEvents?.forEach((event) => {
      eventDates?.push(new Date(event?.date)?.toISOString().split("T")[0]);
    });
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          flex: 1,
          margin: "1rem 0 0 0",
        }}
      >
        <Typography variant="h4" gutterBottom>
          All Gigs
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            {isLoading ? (
              <Typography>Loading...</Typography>
            ) : (
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={selectedDate}
                onChange={handleDateChange}
                textField={<TextField />}
                slots={{ day: GigDay }}
                slotProps={{ day: { highlightedDays: eventDates } }}
                sx={{ width: "100%", p: 0, m: 0 }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              {displayDJs?.length > 0 ? (
                displayDJs?.map((dj) => (
                  <div key={dj?._id}>
                    <ListItem>
                      <Box flex={1}>
                        <Typography variant="h6">{dj?.name}</Typography>
                        {dj?.upcomingEvents?.map((event) => (
                          <div key={event?._id}>
                            <Typography variant="body1">
                              {event?.name} -{" "}
                              {new Date(event?.date).toLocaleDateString()}
                            </Typography>
                          </div>
                        ))}
                      </Box>
                    </ListItem>
                    <Divider />
                  </div>
                ))
              ) : (
                <Typography variant="h6" align="center">
                  No events on the selected date.
                </Typography>
              )}
            </List>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}
