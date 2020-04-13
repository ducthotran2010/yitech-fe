import { useEffect } from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';

import { ComplexRegistration } from '../component/user/complex-registration/complex-registration';
import { useAccountContext } from '../component/profile/profile-context';

const Page = () => {
  const { profile, setting, setSetting } = useAccountContext();
  const router = useRouter();

  let activeOrganization;
  let activeWebsite;
  let webID;
  let isLogged = false;

  if (setting) {
    activeOrganization = setting.activeOrganization;
    activeWebsite = setting.activeWebsite;
  }

  if (profile && (!activeOrganization || !activeWebsite)) {
    activeOrganization = profile.organizations[0];
    activeWebsite = activeOrganization.websites[0];
  }

  if (activeWebsite) {
    webID = activeWebsite.webID;
    isLogged = true;
  }

  useEffect(() => {
    if (activeWebsite && activeWebsite) {
      setSetting({
        activeOrganization,
        activeWebsite,
      });
    }
  }, [activeOrganization, activeWebsite]);
  return (
    <>
      <div className="relative">
        <div
          className="bg-local bg-cover h-screen"
          style={{ backgroundImage: 'url(/background-banner.jpg)' }}
        ></div>

        <div className="flex items-center px-40 justify-between absolute h-screen w-screen top-0 left-0">
          <div className="flex flex-col justify-center">
            <p className="font-sans text-6xl font-bold text-white">
              Yitech
              <br />
              User Tracking
            </p>
            <p className="font-sans text-xl text-black">
              The fast & visual way to understand your user!
            </p>

            {isLogged && (
              <Button
              className="mt-3"
                type="primary"
                size="large"
                onClick={() =>
                  router.push(
                    `/sites/[id]/dashboard`,
                    `/sites/${webID}/dashboard`,
                  )
                }
              >
                Go Track My Site
              </Button>
            )}
          </div>
          <div>{!isLogged && <ComplexRegistration />}</div>
        </div>
      </div>

      <div className="flex flex-row justify-center p-20">
        <div>
          <img src="/heatmap-image.png" alt="" style={{ width: '600px' }} />
        </div>
        <div
          className="flex flex-col justify-center"
          style={{ width: '600px', padding: '100px' }}
        >
          <p className="font-sans text-3xl font-bold pb-5">Heatmap Tracking</p>
          <p>
            We create heatmap tracking features for web owner to understand
            their customer's behavior.
            <br />
            <br />
            We offer 3 types of heatmap tracking: Click, Hover and Content read.
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-center p-20">
        <div
          className="flex flex-col justify-center"
          style={{ width: '600px', padding: '100px' }}
        >
          <p className="font-sans text-3xl font-bold pb-5">Funnel</p>
          <p>
            A visual way to know the traffic throughout your website. We create
            funnel, let you setup the steps and see the result of how your
            customer go through every steps.
          </p>
        </div>
        <div>
          <img src="/funnel-image.png" alt="" style={{ width: '600px' }} />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-20">
        <div className="flex flex-col justify-center items-center p-10">
          <p className="font-sans text-3xl font-bold pb-5">
            Unique Screenshots
          </p>
          <p>Here are some screenshots of what you're going to use.</p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <img src="/feature/feature-1.jpg" alt="" />
          </div>
          <div>
            <img src="/feature/feature-2.jpg" alt="" />
          </div>
          <div>
            <img src="/feature/feature-3.jpg" alt="" />
          </div>
          <div>
            <img src="/feature/feature-4.jpg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
