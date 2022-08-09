export function getRoutes() {
    return fetch('http://localhost:8000/api/Routes/')
      .then(data => data.json())
  }