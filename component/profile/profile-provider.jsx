import { useState, useEffect } from 'react';

import { getAccountContext } from './profile-context';
import { getUser } from '../../common/query-lib/user/get-user';
import { getAccessToken } from '../../utils/account-utils';

export const AccountProvider = ({ children }) => {
  const [profile, setProfile] = useState();
  const [setting, setSetting] = useState();

  const AccountContext = getAccountContext({
    profile,
    setProfile,
    setting,
    setSetting,
  });

  const context = {
    profile,
    setProfile,
    setting,
    setSetting,
  };

  const fetchProfile = async () => {
    try {
      const token = getAccessToken();
      const response = await getUser({ token });
      if (response.status == 304 || response.status == 200) {
        const profile = response.data;
        const activeOrganization = profile.organizations[0];
        const activeWebsite = activeOrganization.websites[0];
        setProfile(response.data);
        setSetting({
          activeOrganization,
          activeWebsite,
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  console.log({ profile, setting });

  return (
    <AccountContext.Provider value={context}>
      {children}
    </AccountContext.Provider>
  );
};
