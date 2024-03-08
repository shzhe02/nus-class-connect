import React from 'react';
import { Course } from '@/types/Course';
import { ClassData } from '@/types/ClassData';
import { Table, TableRow, TableCell } from '@mui/material';

interface TimeColumnProps {
  startTime: number;
  rows: number;
}

const TimeColumn: React.FC<TimeColumnProps> = ({ startTime, rows }) => {
  const hours: number[] = [...Array(rows)].map((_, i) => i + startTime);
  return (
    <div>
      <Table style={{ height: '100%', display: 'flex', width: '50px' }}>
        <tbody style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {hours.map(h => {
            return (
              <TableRow key={h} style={{ flexGrow: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexBasis: '0%' }}>
                <TableCell style={{ borderBottom: '0px', padding: '0px' }}>
                  <strong style={{ color: 'rgb(105, 112, 122)' }}>{h * 100}</strong>
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow style={{ flexGrow: 1 }}>
            <TableCell style={{ padding: '0px', border: '0px' }}>
              <strong style={{ color: 'rgb(105, 112, 122)' }}></strong>
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
    </div>
  );
};

interface ScheduleProps {
  rows: number;
}

const Schedule: React.FC<ScheduleProps> = ({ rows }) => {
  return (
    <div style={{ height: '100%' }}>
      <Table style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <tbody style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <TableRow style={{ flexGrow: 1, display: 'flex', flexDirection: 'row', flexBasis: '0%' }}>
            {['MON', 'TUE', 'WED', 'THU', 'FRI'].map(day => {
              const border = '1px solid rgba(224, 224, 224)';
              const borderLeft = day === 'MON' ? '1px solid rgba(224, 224, 224)' : '0px';
              const topLeftRadius = day === 'MON' ? '10px' : '0px';
              const topRightRadius = day === 'FRI' ? '10px' : '0px';
              return (
                <TableCell
                  key={day}
                  style={{
                    borderTopLeftRadius: topLeftRadius,
                    borderTopRightRadius: topRightRadius,
                    flexGrow: 1,
                    display: 'flex',
                    flexBasis: '0%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0px',
                    borderRight: border,
                    borderLeft: borderLeft,
                    borderBottom: '0px',
                    borderTop: border,
                  }}
                >
                  <strong style={{ color: 'rgb(105, 112, 122)' }}>{day}</strong>
                </TableCell>
              );
            })}
          </TableRow>
          {[...Array(rows)].map((_, i) => {
            const border = '1px solid rgba(224, 224, 224)';
            const borderBottom = i === rows - 1 ? border : '0px';
            const backgroundColor = i % 2 === 0 ? '#efefef' : 'white';
            return (
              <TableRow style={{ flexGrow: 2, display: 'flex', flexDirection: 'row', flexBasis: '0%' }} key={i}>
                {[...Array(5)].map((_, n) => {
                  const borderLeft = n === 0 ? '1px solid rgba(224, 224, 224)' : '0px';
                  const bottomLeftRadius = i === rows - 1 && n === 0 ? '10px' : '0px';
                  const bottomRightRadius = i === rows - 1 && n === 4 ? '10px' : '0px';
                  return (
                    <TableCell
                      key={n}
                      style={{
                        borderBottomLeftRadius: bottomLeftRadius,
                        borderBottomRightRadius: bottomRightRadius,
                        display: 'flex',
                        flexBasis: '0%',
                        backgroundColor: backgroundColor,
                        borderBottom: borderBottom,
                        borderRight: border,
                        borderLeft: borderLeft,
                        padding: '0px',
                        flexGrow: 1,
                      }}
                    ></TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

interface ClassCardsProps {
  classes: ClassData[];
  startTime: number;
  rows: number;
}

const ClassCards: React.FC<ClassCardsProps> = ({ classes, startTime, rows }) => {
  const classesByDay: Map<string, ClassData[]> = new Map(['MON', 'TUE', 'WED', 'THU', 'FRI'].map(day => [day, []]));
  classes.forEach(c => classesByDay.get(c.day)!.push(c));

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, display: 'flex', height: '100%', width: '100%', flexDirection: 'column' }}>
      <div style={{ flexGrow: 1 }}></div>
      <div style={{ flexGrow: rows * 2, display: 'flex', flexBasis: '0%' }}>
        <Table style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <tbody style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <TableRow style={{ display: 'flex', flexGrow: 1, flexDirection: 'row' }}>
              {Array.from(classesByDay.values()).map((classes, i) => {
                // Turn into clusters of overlapping classes
                const clusters: ClassData[][][] = [];
                let currCluster: ClassData[][] = [];
                classes.sort((a, b) => +a.startTime - +b.startTime + +a.endTime - +b.endTime);

                classes.forEach(c => {
                  // No existing cluster exists, so create one
                  if (currCluster.length === 0) {
                    currCluster.push([c]);
                    return;
                  }
                  // An existing cluster exists, so figure out if this class is part of it.
                  const lastElems = currCluster.map(col => col[col.length - 1]);
                  // Case where all elements in existing cluster end before the start of the current class
                  // => make new cluster
                  if (lastElems.filter(lastInCol => +lastInCol.endTime > +c.startTime).length === 0) {
                    clusters.push(currCluster);
                    currCluster = [[c]];
                    return;
                  }
                  // Case where not all existing classes in the cluster end before the start of the current class
                  // (Specifically when an earlier column is free)
                  // => Join cluster
                  for (let k = 0; k < lastElems.length; k++) {
                    if (+lastElems[k].endTime <= +c.startTime) {
                      currCluster[k].push(c);
                      return;
                    }
                  }
                  // No columns in current cluster are free => create new cluster column.
                  currCluster.push([c]);
                });
                // In case there was leftover
                if (currCluster.length > 0) {
                  clusters.push(currCluster);
                }

                let lastEnd = 0;

                return (
                  <TableCell key={i} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '0px', flexBasis: '0%' }}>
                    {clusters.map((cluster, j) => {
                      const clusterStart = +cluster[0][0].startTime / 100;
                      const clusterEnd = Math.min(...cluster.map(col => +col[col.length - 1].endTime / 100));

                      const absoluteStart = clusterStart - startTime;
                      const paddingAbove = absoluteStart - lastEnd;
                      lastEnd = clusterEnd - startTime;

                      return (
                        <React.Fragment key={j}>
                          <div style={{ flexGrow: paddingAbove, flexBasis: '0%' }}></div>
                          <div style={{ flexGrow: clusterEnd - clusterStart, display: 'flex', flexDirection: 'row', flexBasis: '0%' }}>
                            {cluster.map((col, k) => {
                              let lastClassEnd = 0;
                              return (
                                <div
                                  key={k}
                                  style={{
                                    flexGrow: 1,
                                    flexBasis: '0%',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                  }}
                                >
                                  {col.map((c, p) => {
                                    const classStart = +c.startTime / 100;
                                    const paddingAbove = classStart - clusterStart;

                                    const classEnd = +c.endTime / 100;
                                    lastClassEnd = classEnd - clusterStart;
                                    return (
                                      <React.Fragment key={p}>
                                        <div style={{ flexGrow: paddingAbove, flexBasis: '0%' }}></div>
                                        <div
                                          style={{
                                            flexGrow: classEnd - classStart,
                                            backgroundColor: 'orange',
                                            borderRadius: '4px',
                                            margin: '4px',
                                            padding: '4px',
                                          }}
                                        >
                                          {c.lessonType}
                                        </div>
                                      </React.Fragment>
                                    );
                                  })}
                                  <div style={{ flexBasis: '0%', flexGrow: clusterEnd - clusterStart - lastClassEnd }}></div>
                                </div>
                              );
                            })}
                          </div>
                        </React.Fragment>
                      );
                    })}
                    <div style={{ flexGrow: rows - lastEnd, flexBasis: '0%' }}></div>
                  </TableCell>
                );
              })}
            </TableRow>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

interface TimetableProps {
  courses: Course[];
}

const Timetable: React.FC<TimetableProps> = ({ courses }) => {
  // Getting all classes
  const classes = courses.map(course => course.timetableData).reduce((acc, val) => acc.concat(val), []);

  // start and end times of the schedule. Default is 10AM-4PM
  const startTime = Math.ceil(Math.min(...classes.map(c => +c.startTime), 1000)) / 100;
  const endTime = Math.floor(Math.max(...classes.map(c => +c.endTime), 1600)) / 100;

  const rows = endTime - startTime;

  return (
    <div style={{ display: 'flex', margin: '10px', height: 800, width: '99%' }}>
      <TimeColumn startTime={startTime} rows={rows} />
      <div style={{ flexGrow: 1, position: 'relative' }}>
        <ClassCards classes={classes} startTime={startTime} rows={rows} />
        <Schedule rows={rows} />
      </div>
    </div>
  );
};

export default Timetable;
