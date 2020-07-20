function fetchAPI(endpoint, { ...custom } = { mode: "no-cors" }) {
  const config = {
    ...custom,
    headers: {
      ...custom.headers,
    },
  };

  return fetch(endpoint, config)
    .then((res) => {
      if (res.status === 200) {
        return Promise.resolve(res.json());
      } else {
        return Promise.reject(new Error(res.statusText));
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export default fetchAPI;
