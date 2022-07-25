export function getShape(para) {
    return fetch(`http://localhost:8000/api/shape/?shapeid=${para}`)
      .then(data => data.json())
  }