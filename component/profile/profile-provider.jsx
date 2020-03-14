import { useState, useEffect } from 'react';

import { getAccountContext } from './profile-context';
import { getUser } from '../../common/query-lib/user/get-user';
import { getAccessToken } from '../../utils/account-utils';

export const AccountProvider = ({ children }) => {
  const [profile, setProfile] = useState();
  const [setting, setSetting] = useState();
  const [route, setRoute] = useState();

  const AccountContext = getAccountContext({
    profile,
    setProfile,
    setting,
    setSetting,
    route,
    setRoute,
  });

  const context = {
    profile,
    setProfile,
    setting,
    setSetting,
    route,
    setRoute,
  };

  const fetchProfile = async () => {
    try {
      const token = getAccessToken();
      const response = await getUser({ token });
      if (response.status == 304 || response.status == 200) {
        const profile = response.data;
        setProfile(profile);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (route && profile) {
      const activeOrganization = profile.organizations.find(organization =>
        organization.websites.some(({ webID }) => webID == route.id),
      );
      if (activeOrganization) {
        const activeWebsite = activeOrganization.websites.find(
          ({ webID }) => route.id == webID,
        );
        if (activeWebsite) {
          setSetting({
            activeOrganization,
            activeWebsite,
          });
        }
      }
    }
  }, [route, profile]);

  return (
    <AccountContext.Provider value={context}>
      {children}
    </AccountContext.Provider>
  );
};
