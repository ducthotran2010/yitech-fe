import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getAccountContext } from './profile-context';
import { getUser } from '../../common/query-lib/user/get-user';
import { getAccessToken } from '../../utils/account-utils';

export const AccountProvider = ({ children }) => {
  const [profile, setProfile] = useState();
  const [setting, setSetting] = useState();
  const [route, setRoute] = useState();
  const router = useRouter();

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
      let validRoute = false;

      const { webID: routeWebID, organizationID: routeOrganizationID } = route;

      if (routeWebID) {
        const activeOrganization = profile.organizations.find(({ websites }) =>
          websites.some(({ webID }) => webID == routeWebID),
        );
        const activeWebsite = activeOrganization
          ? activeOrganization.websites.find(({ webID }) => webID == routeWebID)
          : undefined;

        if (activeWebsite) {
          setSetting({
            ...setting,
            activeOrganization,
            activeWebsite,
          });
          validRoute = true;
        }
      }

      if (routeOrganizationID) {
        const activeOrganization = profile.organizations.find(
          ({ organizationID }) => routeOrganizationID == organizationID,
        );

        if (activeOrganization) {
          setSetting({ ...setting, activeOrganization });
          validRoute = true;
        }
      }

      if (!validRoute) {
        router.push('/');
      }
    }
  }, [route, profile]);

  return (
    <AccountContext.Provider value={context}>
      {children}
    </AccountContext.Provider>
  );
};
