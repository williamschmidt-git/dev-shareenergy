const endpoint = 'https://http.cat/'

export const getHTTPRequest = async(code: string) => {
  const response = await fetch(`${endpoint}${code}`, {
    method: 'GET',
    mode: "cors",
    redirect: 'follow',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  });

  return await response.json();
}