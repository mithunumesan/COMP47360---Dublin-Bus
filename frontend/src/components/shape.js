export function getShape(para) {
    return fetch(`https://137.43.49.30:443/api/shape/?shapeid=${para}`)
      .then(data => data.json())
  }