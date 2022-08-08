export function getRoutes() {
    return fetch('https://localhost:8000/api/Routes/')
      .then(data => data.json())
  }