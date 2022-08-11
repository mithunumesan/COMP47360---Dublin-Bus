export function getShape(para) {
    return fetch(`http://137.43.49.30:80/api/shape/?shapeid=${para}`)
      .then(data => data.json())
  }