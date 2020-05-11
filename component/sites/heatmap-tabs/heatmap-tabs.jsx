import moment from 'moment';
import { Tabs, message } from 'antd';
import { useState, useEffect } from 'react';

import { ClickDetail } from './click-detail';
import { HoverDetail } from './hover-detail';
import { ScrollDetail } from './scroll-detail';
import { HeatmapBar } from './heatmap-bar';
import { VisitDetail } from './visit-detail';
import { ExtraContent } from './extra-content';
import { STAT_OPTION } from '../../../common/statistic-option';
import { getHeatmapDetail } from '../../../common/query-lib/heatmap-data/get-heatmap-detail';
import { getAccessToken } from '../../../utils/account-utils';
import { getAllVersionTrackingHeatmapInfo } from '../../../common/query-lib/heatmap-data/get-all-version';
import { useRouter } from 'next/router';

const queryStatistic = async ({ id, trackID, from, to, option }) => {
  const token = getAccessToken();
  const localFrom = Math.floor(
    from.startOf('day').add(7, 'hours').valueOf() / 1000,
  );
  const localTo = Math.floor(to.endOf('day').add(7, 'hours').valueOf() / 1000);

  try {
    const response = await getHeatmapDetail(
      id,
      trackID,
      localFrom,
      localTo,
      option,
      token,
    );
    if (response.status === 200 || response.status === 304) {
      return response.data;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const initDetail = {
  visit: '[]',
  click: '[]',
  hover: '[]',
  scroll: '[]',
  imageUrl: '',
  name: 'Product',
  typeUrl: '',
  trackingUrl: '',
  version: '',
};

export const HeatmapTabs = ({
  id,
  trackID,
  setName,
  setTypeUrl,
  setTrackingUrl,
  loading,
  setLoading,
  setVersion,
  setEmptyData,
}) => {
  const router = useRouter();
  const [from, setFrom] = useState(moment().subtract(1, 'months'));
  const [to, setTo] = useState(moment());
  const [option, setOption] = useState(STAT_OPTION.DESKTOP.value);
  const [activeTab, setActiveTab] = useState('visit');
  const [detail, setDetail] = useState(initDetail);
  const {
    visit,
    click,
    hover,
    scroll,
    imageUrl,
    typeUrl,
    name,
    trackingUrl,
    version,
  } = detail;

  useEffect(() => {
    if (typeUrl) {
      setTypeUrl(typeUrl);
    }
    if (name) {
      setName(name);
    }
    if (trackingUrl) {
      setTrackingUrl(trackingUrl);
    }
  }, [typeUrl, name, trackingUrl]);

  useEffect(() => {
    if (version && version.length > 0) {
      setVersion(version);
    }
  }, [version, trackID]);

  useEffect(() => {
    try {
      switch (activeTab) {
        case "visit":
          if (!visit || visit.length <= 2) {
            setEmptyData(true);
            return;
          }
          break;
        case "clicking":
          if (!click || click.length <= 2) {
            setEmptyData(true);
            return;
          }
          break;
        case "hovering":
          if (!hover || hover.length <= 2) {
            setEmptyData(true);
            return;
          }
          break;
        case "scrolling":
          if (!scroll || scroll.length <= 2) {
            setEmptyData(true);
            return;
          }
          break;
      }

      setEmptyData(false);
    } catch (error) {
      setEmptyData(true);
      console.log(error);
    }
  }, [activeTab, visit, click, hover, scroll]);

  const getTabHead = (title) => (
    <div className="text-center" style={{ padding: '0px 20px', minWidth: 80 }}>
      {title}
    </div>
  );

  const fetchStatistic = async () => {
    setLoading(true);
    const detail = await queryStatistic({ id, trackID, from, to, option });
    if (detail) {
      setLoading(false);
      return setDetail(detail);
    }
    setLoading(false);
    message.error('Cannot fetch heatmap statistics');
    router.push('/sites/[id]/heatmaps', `/sites/${id}/heatmaps`);
  };

  useEffect(() => {
    fetchStatistic();
  }, [option, from, to, trackID]);

  console.log({ click: click.slice(0, 10)});
  

  return (
    <>
      {activeTab !== 'visit' && (
        <HeatmapBar
          click={click}
          showedClick={activeTab == 'clicking'}
          showedScroll={activeTab == 'scrolling'}
        />
      )}
      <Tabs
        defaultActiveKey="visit"
        tabBarExtraContent={
          <ExtraContent
            showedDevice={activeTab !== 'visit'}
            setOption={setOption}
            setFrom={setFrom}
            setTo={setTo}
            option={option}
            from={from}
            to={to}
          />
        }
        onChange={(activeKey) => setActiveTab(activeKey)}
        animated={false}
      >
        <Tabs.TabPane
          tab={getTabHead('Visits')}
          key="visit"
          className="px-4 pb-4"
        >
          <VisitDetail loading={loading} data={visit} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={getTabHead('Clicking')}
          key="clicking"
          className="px-4 pb-4"
        >
          <ClickDetail loading={loading} data={click} imageUrl={imageUrl} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={getTabHead('Hovering')}
          key="hovering"
          className="px-4 pb-4"
        >
          <HoverDetail loading={loading} data={hover} imageUrl={imageUrl} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={getTabHead('Content Reading')}
          key="scrolling"
          className="px-4 pb-4"
        >
          <ScrollDetail loading={loading} data={scroll} imageUrl={imageUrl} />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};
