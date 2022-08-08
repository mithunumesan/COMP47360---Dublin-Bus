export function getTrips(para) {
    return fetch(`https://137.43.49.30:443/api/alltrip/?shapeid=${para}`)
      .then(data => data.json())
  }