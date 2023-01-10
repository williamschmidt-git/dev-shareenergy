const URI = 'http://localhost:3000/'

interface LoginBody {
  username: string;
  password: string
}

export const login = async(endpoint: string, body: LoginBody) => {
  const response = await fetch(`${endpoint}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      username: body.username,
      password: body.password
    })
  });

  return response.json();
}