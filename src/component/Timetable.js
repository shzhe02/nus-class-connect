import React from 'react';
import './Timetable.css';

function Timetable() {
  return (
    <div className="Timetable"> {/* Apply rounded-corners class */}
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>MON</th>
            <th>TUE</th>
            <th>WED</th>
            <th>THU</th>
            <th>FRI</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(13)].map((_, index) => {
            const hour = index + 8;
            const time = hour < 12 ? `${hour} AM` : `${hour === 12 ? 12 : hour - 12} PM`;
            return (
              <tr key={hour}>
                <td>{time}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Timetable;
