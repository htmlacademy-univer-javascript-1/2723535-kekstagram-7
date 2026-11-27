function isMeetingInWorkday(workStart, workEnd, meetingStart, meetingDuration) {
  const parseTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const workStartMin = parseTime(workStart);
  const workEndMin = parseTime(workEnd);
  const meetingStartMin = parseTime(meetingStart);
  const meetingEndMin = meetingStartMin + meetingDuration;

  return meetingStartMin >= workStartMin && meetingEndMin <= workEndMin;
}
