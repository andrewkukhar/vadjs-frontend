import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (dateString, format = 'MM/DD/YY', timeZone = 'America/Los_Angeles') => {
  if (!dateString) return '';
  return dayjs.tz(dateString, timeZone).utc().format(format);
};
