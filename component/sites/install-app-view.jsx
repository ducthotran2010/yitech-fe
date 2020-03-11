import { Button } from 'antd';
import { Typography, Layout } from 'antd';
import { useState, useEffect } from 'react';

export const InstallAppView = ({ webID }) => {
  const [endpoint, setEndpoint] = useState('');

  useEffect(() => {
    const endpoint = `${window.location.origin}/yitech`;
    setEndpoint(endpoint);
  }, []);

  return (
    <div>
      <Typography.Title level={4}>Install YiTech on your site</Typography.Title>
      <p className="mb-1">
        Paste the Hotjar code into the <b>{`<head>`}</b> of every page you wish
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

      <Button type="green" size="large">
        Verify Installation
      </Button>
    </div>
  );
};
