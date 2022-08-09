export function getTrips(para) {
    return fetch(`http://localhost:8000/api/alltrip/?shapeid=${para}`)
      .then(data => data.json())
  }