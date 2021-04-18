module.exports = async function postData(url = '', method, data = {}) {
  let response = {};
  if (method == 'GET') {
    await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => (response = data));
  } else {
    await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => (response = data));
  }
  return response;
};
