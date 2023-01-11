import formatRandomUsers from "../../utils/formatRandomUsers";

export const RANDOM_USER_URI = "https://randomuser.me/api/"

export const getRandomUser = async (numberOfRequests: number) => {
  const response = await fetch(`${RANDOM_USER_URI}?results=${numberOfRequests}`, {
    method: 'GET',
    mode: "cors",
    redirect: 'follow',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  });

  const { results } = await response.json()
  const formattedResult = formatRandomUsers(results)
  return formattedResult;
}
