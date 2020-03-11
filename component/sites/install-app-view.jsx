import { Button } from 'antd';
import { Typography, Layout } from 'antd';

const ENDPOINT_LIBRARY = 'http://localhost:7777/lib.js';
export const InstallAppView = () => {
  const webID = 1231;
  return (
    <div>
      <Typography.Title level={4}>Install YiTech on your site</Typography.Title>
      <div className="shadow-inner bg-gray-200 p-4">
        <code className="whitespace-pre-wrap">
          {`  <script>
   (function(Y, i, T, e, c, h) {
      Y.webID = e;
      c = i.getElementsByTagName('head')[0];
      h = i.createElement('script');
      h.async = 1;
      h.src = T;
      c.appendChild(h);
    })(window, document, '${ENDPOINT_LIBRARY}', ${webID});
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
