import { Breadcrumb, Typography, Layout, Tabs, Menu } from 'antd';
import { useRouter } from 'next/router';

import { SideBar, SideBarDefault } from '../../../../component/sites/side-bar';
import { HeatmapTabs } from '../../../../component/sites/heatmap-tabs';
import { SkeletonPage } from '../../../../component/sites/skeleton-page';

const ClickStatistic = ({ id, trackID }) => {
  const router = useRouter();
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push(i);
  }

  return (
    <SkeletonPage id={id} sideBarActive={SideBarDefault.HEATMAPS}>
      <Breadcrumb>
        <Breadcrumb.Item>Analytics</Breadcrumb.Item>
        <Breadcrumb.Item>Click Tracking</Breadcrumb.Item>
        <Breadcrumb.Item>Product {trackID}</Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title level={2}>Product {trackID}</Typography.Title>

      <div className="bg-white">
        <HeatmapTabs />
      </div>
    </SkeletonPage>
  );
};

ClickStatistic.getInitialProps = ({ query: { id, trackID } }) => {
  return { id, trackID };
};

export default ClickStatistic;

// <Layout className="h-screen flex flex-row">
// <SideBar id={id} sideBarActive={SideBarDefault.CLICK_EVENT} />
// <Layout.Sider
//   collapsible
//   collapsedWidth={0}
//   zeroWidthTriggerStyle={{ bottom: 0, top: 'auto' }}
//   defaultCollapsed={true}
//   width={150}
//   theme="dark"
//   breakpoint="md"
// >
//   <Menu
//     mode="inline"
//     theme="light"
//     className="h-screen overflow-y-auto border-r-0"
//     defaultSelectedKeys={[trackID]}
//   >
//     {data.map(trackID => (
//       <Menu.Item
//         key={trackID}
//         onClick={() =>
//           router.push(
//             '/sites/[id]/heatmaps/[trackID]',
//             `/sites/${id}/heatmaps/${trackID}`,
//           )
//         }
//       >
//         Product {trackID}
//       </Menu.Item>
//     ))}
//   </Menu>
// </Layout.Sider>
// <Layout className="h-full flex-1 p-8 overflow-y-auto ">
//   <Breadcrumb>
//     <Breadcrumb.Item>Analytics</Breadcrumb.Item>
//     <Breadcrumb.Item>Click Tracking</Breadcrumb.Item>
//     <Breadcrumb.Item>Product {trackID}</Breadcrumb.Item>
//   </Breadcrumb>

//   <Typography.Title level={2}>Product {trackID}</Typography.Title>

//   <div className="bg-white">
//     <HeatmapTabs />
//   </div>
// </Layout>
// </Layout>