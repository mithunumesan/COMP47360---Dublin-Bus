export function getRoutes() {
    return fetch('http://137.43.49.30:80/api/Routes/')
      .then(data => data.json())
  }