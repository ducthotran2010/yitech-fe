import { Button } from 'antd';
import { Typography, Layout } from 'antd';

export const InstallAppView = () => {
  return (
    <div>
      <Typography.Title level={3}>Install YiTech on your site</Typography.Title>
      <div className="bg-gray-200 p-4">
        <code className="whitespace-pre-wrap">
          {`  <script>
      (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:1715145,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
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
