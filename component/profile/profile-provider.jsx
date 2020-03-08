import { useState } from 'react';

import { getAccountContext } from './profile-context';

export const AccountProvider = ({ children }) => {
  const [profile, setProfile] = useState();

  const AccountContext = getAccountContext({
    profile,
    setProfile,
  });

  const context = {
    profile,
    setProfile,
  };

  return (
    <AccountContext.Provider value={context}>
      {children}
    </AccountContext.Provider>
  );
};
