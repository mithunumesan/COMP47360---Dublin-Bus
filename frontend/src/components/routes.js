export function getRoutes() {
    return fetch('https://137.43.49.30:443/api/Routes/')
      .then(data => data.json())
  }