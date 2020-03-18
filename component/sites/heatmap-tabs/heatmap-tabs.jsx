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
import moment from 'moment';

const queryStatistic = async ({ id, trackID, from, to, option }) => {
  const token = getAccessToken();
  const response = await getHeatmapDetail(
    id,
    trackID,
    Math.floor(from.startOf('day').valueOf() / 1000),
    Math.floor(to.endOf('day').valueOf() / 1000),
    option,
    token,
  );
  if (response.status === 200 || response.status === 304) {
    return response.data;
  }

  return null;
};

const initDetail = {
  visit: '[]',
  click: '[]',
  hover: '[]',
  scroll: '[]',
  imageUrl: '',
};

export const HeatmapTabs = ({ id, trackID }) => {
  const [from, setFrom] = useState(moment().subtract(7, 'days'));
  const [to, setTo] = useState(moment());
  const [option, setOption] = useState(STAT_OPTION.DESKTOP.value);
  const [activeTab, setActiveTab] = useState('visit');
  const [detail, setDetail] = useState(initDetail);
  const { visit, click, hover, scroll, imageUrl } = detail;

  const getTabHead = title => (
    <div className="text-center" style={{ padding: '0px 20px', minWidth: 80 }}>
      {title}
    </div>
  );

  const fetchStatistic = async () => {
    const detail = await queryStatistic({ id, trackID, from, to, option });
    if (detail) {
      return setDetail(detail);
    }

    message.error('Cannot fetch heatmap statistics');
  };

  useEffect(() => {
    fetchStatistic();
  }, [option, from, to]);

  return (
    <>
      {activeTab !== 'visit' && (
        <HeatmapBar showedScroll={activeTab == 'scrolling'} />
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
        onChange={activeKey => setActiveTab(activeKey)}
        animated={false}
      >
        <Tabs.TabPane
          tab={getTabHead('Visits')}
          key="visit"
          className="px-4 pb-4"
        >
          <VisitDetail data={visit} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={getTabHead('Clicking')}
          key="clicking"
          className="px-4 pb-4"
        >
          <ClickDetail data={click} imageUrl={imageUrl} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={getTabHead('Hovering')}
          key="hovering"
          className="px-4 pb-4"
        >
          <HoverDetail data={hover} imageUrl={imageUrl} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={getTabHead('Content Reading')}
          key="scrolling"
          className="px-4 pb-4"
        >
          <ScrollDetail data={scroll} imageUrl={imageUrl} />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};
