export function getmarkers() {
    return fetch('http://localhost:8000/api/Stops/')
      .then(data => data.json())
  }