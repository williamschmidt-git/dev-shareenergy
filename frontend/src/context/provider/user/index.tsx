import React, { useState } from 'react';
import UserContext, { DEFAULT_VALUE } from '../../user';

interface Props {
  children: React.ReactNode
}

export default function UserProvider({ children } : Props) {
  const [state, setState] = useState(DEFAULT_VALUE.state);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const obj = { state, setState };

  return (
    <UserContext.Provider value={obj}>
      { children }
    </UserContext.Provider>
  );
}
