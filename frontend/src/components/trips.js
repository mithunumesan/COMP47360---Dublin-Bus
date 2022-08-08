export function getTrips(para) {
    return fetch(`https://localhost:8000/api/alltrip/?shapeid=${para}`)
      .then(data => data.json())
  }