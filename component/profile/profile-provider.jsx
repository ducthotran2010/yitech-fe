import { useState, useEffect } from 'react';

import { getAccountContext } from './profile-context';
import { getUser } from '../../common/query-lib/user/getUser';
import { getAccessToken } from '../../utils/account-utils';

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

  const fetchProfile = async () => {
    try {
      const token = getAccessToken();
      const response = await getUser({ token });
      if (response.status == 304 || response.status == 200) {
        const { profile } = response.data;
        setProfile(profile);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AccountContext.Provider value={context}>
      {children}
    </AccountContext.Provider>
  );
};
