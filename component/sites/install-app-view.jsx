import { Button, Input } from 'antd';
import { Typography, Layout } from 'antd';
import { useState, useEffect } from 'react';
import { useAccountContext } from '../profile/profile-context';

export const InstallAppView = ({ webID }) => {
  const [endpoint, setEndpoint] = useState('');
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const { setting } = useAccountContext();

  useEffect(() => {
    const endpoint = `${window.location.origin}/yitech`;
    setEndpoint(endpoint);
  }, []);

  const handleVerify = value => {
    console.log(value);
    setLoading(true);
    setFailed(false);

    setTimeout(() => {
      try {
        console.log({ setting });

        if (setting && setting.activeWebsite) {
          const { webUrl } = setting.activeWebsite;
          console.log({
            value,
            domainUrl: webUrl,
            res: !value.startsWith(webUrl),
          });

          setFailed(!value.startsWith(webUrl));
          return;
        }

        setFailed(true);
      } catch (error) {
        setFailed(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div>
      <Typography.Title level={4}>
        1. Install YiTech on your site
      </Typography.Title>
      <p className="mb-2">
        Paste the YiTech code into the <b>{`<head>`}</b> of every page you wish
        to track visitors and collect feedback on, and then verify your
        installation.
      </p>
      <div className="shadow rounded bg-gray-800 p-4">
        <code className="whitespace-pre-wrap text-gray-200">
          {`  <script>
   (function(Y, i, T, e, c, h) {
      Y.webID = e;
      c = i.getElementsByTagName('head')[0];
      h = i.createElement('script');
      h.async = 1;
      h.src = T;
      c.appendChild(h);
    })(window, document, '${endpoint}', ${webID});
  </script>`}
        </code>
      </div>
      <br />

      <Typography.Title level={4}>2. Verify your installation</Typography.Title>
      <p className="mb-2">
        Enter the URL of the site you installed YiTech onto in the field below.
      </p>
      <Input.Search
        size="large"
        placeholder="Enter your URL"
        className="mb-2"
        style={{ width: 600 }}
        enterButton="Verify Now"
        loading={loading}
        onPressEnter={event => handleVerify(event.currentTarget.value)}
        onSearch={handleVerify}
      />

      {failed && (
        <p className="text-red-600">
          YiTech installation could not be verified, please confirm that the
          tracking code has been installed on this page.
        </p>
      )}
    </div>
  );
};
