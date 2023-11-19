import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import jwtDecode from "jwt-decode";

dayjs.extend(utc);
dayjs.extend(timezone);

export const isTokenExpired = (token) => {
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

export const formatDate = (
  dateString,
  format = "MM/DD/YY",
  timeZone = "America/Los_Angeles"
) => {
  if (!dateString) return "";
  return dayjs.tz(dateString, timeZone).utc().format(format);
};

export function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
