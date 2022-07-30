export function getTripSchedule(line,stopname,time) {
  return fetch(`http://localhost:8000/api/tripschedule/?routeshortname=${line}&stopname=${stopname}&arrivaltime=${time}`)
    .then(data => data.json())
}
export function getTripFind(para) {
    return fetch(`http://localhost:8000/api/tripfind/?tripid=${para}`)
      .then(data => data.json())
  }

