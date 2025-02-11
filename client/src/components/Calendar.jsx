import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ical from 'ical';
import moment from 'moment';
// Import FullCalendar locales
import '@fullcalendar/core/locales/en-gb.js';
import '@fullcalendar/core/locales/de.js';
import '@fullcalendar/core/locales/hr.js';
import '@fullcalendar/core/locales/ru.js';
import '@fullcalendar/core/locales/pl.js';
import '@fullcalendar/core/locales/hu.js';
const Calendar = () => {
  const { t,i18n } = useTranslation();
  const [bookedDates, setBookedDates] = useState([]);
  const [error, setError] = useState(null);
  const language = i18n.language; 
  const pricingPeriods = [
    { start: moment('2025-06-15'), end: moment('2025-07-31'), price: 120 },
    { start: moment('2025-08-01'), end: moment('2025-08-31'), price: 150 },
    { start: moment('2025-09-01'), end: moment('2025-09-15'), price: 180 },
  ];

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const airbnbUrl = "http://localhost:5000/api/calendar/airbnb";
        const bookingUrl = "http://localhost:5000/api/calendar/booking";

        const [airbnbData, bookingData] = await Promise.all([
          fetch(airbnbUrl).then(res => res.text()),
          fetch(bookingUrl).then(res => res.text())
        ]);

        const parseICal = (data) => {
          const parsed = ical.parseICS(data);
          return Object.values(parsed)
            .filter(event => event.start && event.end)
            .map(event => {
              // Parse start and end dates with moment
              const startDate = moment(event.start).local().toDate();
              const endDate = moment(event.end).local().toDate();

              let className = 'full-red';  // Default to fully red for unavailable days

              // If the event spans multiple days
              if (!moment(event.start).isSame(event.end, 'day')) {
                // For multi-day bookings, mark the entire day as red
                endDate.setHours(23, 59, 59, 999);  // Set end time to 11:59 PM
              } else {
                // If it's a single day booking, mark the entire day as red
                endDate.setHours(23, 59, 59, 999);  // Set end time to 11:59 PM
              }

              return {
                start: startDate,
                end: endDate,
                allDay: true,
                className: className,  // Apply full-red class
              };
            });
        };

        const airbnbBookedDates = parseICal(airbnbData);
        const bookingBookedDates = parseICal(bookingData);

        // Combine both and remove duplicates by checking both start and end date
        const allBookedDates = [...airbnbBookedDates, ...bookingBookedDates];
        const uniqueBookedDates = allBookedDates.filter((date, index, self) =>
          index === self.findIndex((d) => (
            // Compare both start and end dates for overlaps
            (moment(d.start).isSame(date.start, 'day') && moment(d.end).isSame(date.end, 'day')) || 
            (moment(d.start).isSame(date.start, 'day') && moment(d.end).isAfter(date.start)) || 
            (moment(d.start).isBefore(date.end) && moment(d.end).isSame(date.end, 'day'))
          ))
        );

        setBookedDates(uniqueBookedDates);
      } catch (error) {
        setError('Error fetching iCal data.');
        console.error('Error fetching iCal data:', error);
      }
    };

    fetchCalendarData();
  }, [t,language]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="calendar-section">
      <div className="calendar-container">
        <h2 className='calendar-title'>{t('availability_calendar')}</h2>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={bookedDates}
          locale={language}
        />
      </div>
      <div className="pricing-table-section">
        <h3 className="pricing-title">{t('pricing_information')}</h3>
        <table className="pricing-table">
          <thead>
            <tr>
              <th>{t('price_range')}</th>
              <th>{t('price_per_night')}</th>
            </tr>
          </thead>
          <tbody>
            {pricingPeriods.map((period, index) => (
              <tr key={index}>
                <td>{`${period.start.format('DD.MM')} - ${period.end.format('DD.MM')}`}</td>
                <td>{`$${period.price}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
