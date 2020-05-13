import { Typography, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

export const InstallAppView = ({ webID }) => {
  const [endpoint, setEndpoint] = useState('');

  useEffect(() => {
    const endpoint = `${window.location.origin}/yitech.js`;
    setEndpoint(endpoint);
  }, []);

  const script = `  <script>
  (function(Y, i, T, e, c, h) {
     Y.webID = e;
     c = i.getElementsByTagName('head')[0];
     h = i.createElement('script');
     h.async = 1;
     h.src = T;
     c.appendChild(h);
   })(window, document, '${endpoint}', ${webID});
 </script>`;

  const copyToClipboard = () => {
    const input = document.createElement('input');
    input.value = script;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
    message.success('Copied to clipboard!');
  };

  return (
    <div>
      <Typography.Title level={4}>Install YiTech on your site</Typography.Title>
      <p className="mb-2">
        Paste the YiTech code into the <b>{`<head>`}</b> of every page you wish
        to track visitors and collect feedback on, and then verify your
        installation.
      </p>
      <div className="relative shadow rounded bg-gray-800 p-4">
        <div className="absolute p-4 right-0 bottom-0 cursor-pointer" onClick={copyToClipboard}>
          <CopyOutlined style={{ color: '#fff'}} className="text-xl" />
        </div>
        <code className="whitespace-pre-wrap text-gray-200">
          {script}
        </code>
      </div>
      <br />
    </div>
  );
};
