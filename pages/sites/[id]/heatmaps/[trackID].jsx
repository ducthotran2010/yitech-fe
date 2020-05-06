import { useState, useEffect } from 'react';
import { Breadcrumb, Typography, Layout, Tabs, Menu, Skeleton, Popover, Modal, message, Alert } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';

import { SideBarDefault } from '../../../../component/sites/side-bar';
import { HeatmapTabs } from '../../../../component/sites/heatmap-tabs/heatmap-tabs';
import { SkeletonPage } from '../../../../component/sites/skeleton-page/skeleton-page';
import { TYPE_URL } from '../../../../common/type-url';
import { withAuth } from '../../../../component/user/with-auth';
import { getAccessToken } from '../../../../utils/account-utils';
import { getAllVersionTrackingHeatmapInfo } from '../../../../common/query-lib/heatmap-data/get-all-version';
import { useRouter } from 'next/router';
import { FooterModal } from '../../../../component/footer-modal';
import { AddVersionModal } from '../../../../component/sites/heatmap-tabs/add-version-modal';
import { createVersion } from '../../../../common/query-lib/heatmap-data/create-version';
import { deleteVersion } from '../../../../common/query-lib/heatmap-data/delete-version';
import { deleteTrackingInfo } from '../../../../common/query-lib/heatmap-data/delete-tracking-info';

const Statistic = ({ id, trackID }) => {
  const router = useRouter();
  const [showed, setShowed] = useState(false);
  const [trackingUrl, setTrackingUrl] = useState('');
  const [name, setName] = useState('');
  const [typeUrl, setTypeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [versions, setVersions] = useState(null);
  const [version, setVersion] = useState(null);
  const [emptyData, setEmptyData] = useState(false);
  const typeUrlKey = Object.keys(TYPE_URL).find(
    (key) => TYPE_URL[key].key === typeUrl,
  );
  const typeUrlDisplay = typeUrlKey ? TYPE_URL[typeUrlKey].display : typeUrl;


  const fetchVersion = async () => {
    const token = getAccessToken();
    const response = await getAllVersionTrackingHeatmapInfo(trackID, token);
    if (response.status === 200 || response.status === 304) {
      return setVersions(response.data);
    }

    return null;
  };

  useEffect(() => {
    fetchVersion();
  }, [trackID]);

  const addVersion = (version) => setVersions([...versions, version,]);

  const handleAddVersion = async () => {
    if (TYPE_URL.MATCH.key !== typeUrl) {
      setShowed(true);
    } else {
      setAdding(true);
      message.info('Please wait a second!');
      try {
        const token = getAccessToken();
        const response = await createVersion(trackID, trackingUrl, token);
        if (response.status === 200 || response.status === 304) {
          message.success('Add version success!');
          addVersion(response.data);
          return;
        }

        message.error('Add version success!');
      } catch (error) {
        message.error('Sorry, you can not create now, please try again later!');
        console.error(error);
      } finally {
        setAdding(false);
      }
    }
  }

  const handleDeleteVersion = (trackingHeatmapInfoId) => async ({ domEvent: event }) => {
    event.stopPropagation();
    const token = getAccessToken();
    console.log({ trackingHeatmapInfoId });

    try {
      const response = await deleteTrackingInfo({ trackingHeatmapInfoID: trackingHeatmapInfoId, token });
      if (response.status === 200 || response.status === 304) {
        const newVersion = versions.filter(({ trackingHeatmapInfoId: current }) => current !== trackingHeatmapInfoId);
        setVersions(newVersion);

        if (trackID == trackingHeatmapInfoId) {
          const last = newVersion.length - 1;
          if (last >= 0) {
            const trackingHeatmapInfoId = newVersion[last].trackingHeatmapInfoId;
            router.push('/sites/[id]/heatmaps/[trackID]', `/sites/${id}/heatmaps/${trackingHeatmapInfoId}`);
          } else {
            router.push('/sites/[id]/heatmaps', `/sites/${id}/heatmaps`);
          }
        }

        message.success(`Remove version successfully`);
      }
    } catch (error) {
      message.error(`Could not remove that version`);
    }
  }

  return (
    <SkeletonPage id={id} sideBarActive={SideBarDefault.HEATMAPS}>
      <Breadcrumb>
        <Breadcrumb.Item>Analytics</Breadcrumb.Item>
        <Breadcrumb.Item>Heatmaps</Breadcrumb.Item>
        <Breadcrumb.Item>Heatmap Detail</Breadcrumb.Item>
      </Breadcrumb>

      {!loading ? (
        <Typography.Title level={2} style={{ marginBottom: 4 }}>
          {name}
        </Typography.Title>
      ) : (
          <div className="w-full mt-4 mb-8" style={{ maxWidth: 400 }}>
            <Skeleton.Input title={true} loading={loading} active />
          </div>
        )}

      <div className="text-gray-600 mb-4">
        {typeUrlDisplay && typeUrlDisplay.length > 0 && (
          <p>
            URL {typeUrlDisplay.toLowerCase()}&nbsp;
            <span className="underline cursor-pointer">{trackingUrl}</span>
          </p>
        )}
        {!loading && versions && versions.length > 0 && (
          <div className="block mt-2">
            <span>Version: </span>
            <Popover
              placement="right"
              trigger="hover"
              content={
                <Menu
                  theme="light"
                  selectable={false}
                  mode="vertical"
                  className="border-r-0"
                  style={{ maxWidth: 250 }}
                  defaultSelectedKeys={[version]}
                >
                  {versions.map(({ version, trackingHeatmapInfoId }) => (
                    <Menu.Item
                      key={version}
                      onClick={() => router.push('/sites/[id]/heatmaps/[trackID]', `/sites/${id}/heatmaps/${trackingHeatmapInfoId}`)}
                    >
                      <Popover
                        overlayClassName="custom-popover"
                        placement="right" trigger="hover" content={
                          <Menu selectable={false}>
                            <Menu.Item onClick={handleDeleteVersion(trackingHeatmapInfoId)}>
                              Delete
                          </Menu.Item>
                          </Menu>
                        }>
                        {version}
                      </Popover>
                    </Menu.Item>
                  ))}
                  <Menu.Item onClick={() => handleAddVersion()}>
                    <div className="flex items-center">
                      <PlusOutlined />
                      <span>Version</span>
                    </div>
                  </Menu.Item>
                </Menu>
              }
              overlayClassName="custom-popover">
              <span className="inline-flex items-center cursor-pointer font-semibold text-gray-700 hover:bg-white py-1 px-3 border border-gray-500 bg-gray-100 rounded-md">
                {version}
                {adding && (
                  <span className="ml-2">
                    <LoadingOutlined />
                  </span>
                )}
              </span>
            </Popover>
          </div>
        )}
        <div className="mt-4"></div>
        {!loading && emptyData && (
          <Alert message="There is no tracked information, please double check your install app steps" type="info" showIcon />
        )}
      </div>

      <div className="bg-white">
        <HeatmapTabs
          id={id}
          trackID={trackID}
          setName={setName}
          setTypeUrl={setTypeUrl}
          setTrackingUrl={setTrackingUrl}
          setLoading={setLoading}
          loading={loading}
          setVersion={setVersion}
          setEmptyData={setEmptyData}
        />
      </div>

      <AddVersionModal
        typeUrl={typeUrl}
        trackingUrl={trackingUrl}
        addVersion={addVersion}
        visible={showed}
        setVisible={setShowed}
      />
    </SkeletonPage>
  );
};

Statistic.getInitialProps = ({ query: { id, trackID } }) => {
  return { id, trackID };
};

export default withAuth(Statistic);
