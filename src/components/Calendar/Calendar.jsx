import moment from "moment/dist/moment"
import ru from "moment/dist/locale/ru"
const Calendar = ({ date }) => {
    moment.locale("ru", ru); // Устанавливаю русскую локаль

    const currentDate = moment(date);
    const currentMonthName = currentDate.format('MMMM');
    const currentYear = currentDate.format('YYYY');
    const currentDayNum = currentDate.format('D');
    const firstDayOfMonth = moment(date).startOf('month').startOf('week');
    const lastDayOfMonth = moment(date).endOf('month').endOf('week');


    const generateCalendar = () => {
        const calendar = [];
        let currentWeek = [];

        let day = moment(firstDayOfMonth);

        while (day.isSameOrBefore(lastDayOfMonth)) {
            if (currentWeek.length === 7) {
                calendar.push(currentWeek);
                currentWeek = [];
            }

            currentWeek.push(moment(day));
            day.add(1, 'day');
        }

        calendar.push(currentWeek);

        return calendar;
    };

    const calendarData = generateCalendar();
    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{currentDate.format('dddd')}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{currentDayNum}</div>
                    <div className="ui-datepicker-material-month">{currentMonthName}</div>
                    <div className="ui-datepicker-material-year">{currentYear}</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{currentMonthName}</span>&nbsp;<span className="ui-datepicker-year">{currentYear}</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    {Array.from({ length: 7 }).map((_, index) => (
                        <col key={index} className={index === 5 || index === 6 ? 'ui-datepicker-week-end' : ''} />
                    ))}
                </colgroup>
                <thead>
                <tr>
                    {moment.weekdaysShort().map((day, index) => (
                        <th key={index} scope="col" title={day}>
                            {day}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {calendarData.map((week, weekIndex) => (
                    <tr key={weekIndex}>
                        {week.map((day, dayIndex) => {
                            const isCurrentMonth = day.format('MM') === currentMonthName;
                            const isCurrentDay = day.isSame(currentDate, 'day');
                            const isOtherMonth = !isCurrentMonth || (weekIndex === 0 && dayIndex < firstDayOfMonth.weekday()) || (weekIndex === calendarData.length - 1 && dayIndex >= lastDayOfMonth.weekday());

                            return (
                                <td
                                    key={dayIndex}
                                    className={isCurrentDay ? 'ui-datepicker-today' : isOtherMonth ? 'ui-datepicker-other-month' : ''}
                                >
                                    {day.format('D')}
                                </td>
                            );
                        })}
                    </tr>
                ))}


                </tbody>
            </table>
        </div>
    );
};

export default Calendar;
