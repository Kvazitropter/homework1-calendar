import React from 'react';
import moment from 'moment';
import cn from 'classnames';
import ru from '../locales/ru.js';

const Calendar = (props) => {
  moment.locale('ru', ru);
  const date = moment(props.date);
  const year = date.year();
  const month = date.format('MMMM');
  const dayOfWeek = date.format('dddd');
  const [day, formattedMonth] = date.format('D MMMM').split(' ');

  const renderTable = () => {
    const weekdays = moment.weekdays(true);
    const weekdaysShort = moment.weekdaysShort(true);
    
    const firstDay = date.clone().startOf('M').startOf('W');
    const lastDay = date.clone().endOf('M').endOf('W');
    const weeksCount = (lastDay.diff(firstDay, 'days') + 1) / 7;
    const monthPattern = Array(weeksCount).fill(Array(7).fill(0));
    const d = firstDay.clone();

    return (
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            {weekdays.map((weekday, indx) => (
              <th key={indx} scope="col" title={weekday}>{weekdaysShort[indx]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {monthPattern.map((weekPattern, i) => {
            return (
              <tr key={i}>
                {weekPattern.map((_, inx) => {
                  const tdClass = cn({
                    'ui-datepicker-other-month': d.format('MMMM') !== month,
                    'ui-datepicker-today': d.format('D') === day,
                  });
                  const tdEl = <td key={inx} className={tdClass}>{d.date()}</td>;
                  d.add(1, 'd');

                  return tdEl;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{dayOfWeek}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{day}</div>
          <div className="ui-datepicker-material-month">{formattedMonth}</div>
          <div className="ui-datepicker-material-year">{year}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{month}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
        </div>
      </div>
      {renderTable()}
    </div>
  );
};

export default Calendar;
