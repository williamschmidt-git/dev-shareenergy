import { FormattedRandomUser } from '../components/MainComponent';

export interface RandomUser {
  cell: string;
  dob: {
    date: string;
    age: number;
  },
  email: string;
  gender: string;
  id: {
    name: string;
    value: string;
  }
  location: {
    city: string;
    coordinates: {
      latitude: string;
      longitude: string;
    },
    country: string;
    postcode: string;
    state: string
  },
  login: {
    md5: string;
    password: string;
    salt: string;
    sha1: string;
    sha256: string;
    username: string;
    uuid: string;
  },
  name: {
    title: string;
    first: string;
    last: string
  },
  nat: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  },
  registered: {
    age: number;
    date: string;
  }
}

export default function formatRandomUsers(users: RandomUser[]): FormattedRandomUser[] {
  const formattedUsers: FormattedRandomUser[] = users.map((user) => {
    const formattedUser = {
      picture: user.picture.thumbnail,
      fullName: `${user.name.first} ${user.name.last}`,
      email: user.email,
      username: user.login.username,
      age: user.dob.age,
    };

    return formattedUser;
  });

  return formattedUsers;
}
