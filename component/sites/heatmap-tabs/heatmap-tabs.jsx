import { Tabs, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { ClickDetail } from './click-detail';
import { HoverDetail } from './hover-detail';
import { ScrollDetail } from './scroll-detail';
import { HeatmapBar } from './heatmap-bar';
import { VisitDetail } from './visit-detail';

const dateFormat = 'DD/MM/YYYY';
const OPTION = {
  MOBILE: 'Mobile',
  TABLET: 'Tablet',
  DESKTOP: 'Desktop',
  All: 'All',
};

export const HeatmapTabs = ({ detail: { click, hover, imageUrl } }) => {
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [option, setOption] = useState(OPTION.LAST_YEAR);
  const [activeTab, setActiveTab] = useState('visit');

  const getTabHead = title => (
    <div className="text-center" style={{ padding: '0px 20px', minWidth: 80 }}>
      {title}
    </div>
  );

  const initDate = () => {
    const date = new Date();
    setTo(date);
    setFrom(new Date().setDate(date.getDate() - 7));
  };

  useEffect(() => {
    initDate();
  }, []);

  useEffect(() => {
    switch (option) {
    }
  }, [option]);

  const ExtraContent = () => (
    <div className="hidden md:block">
      {[OPTION.All, OPTION.MOBILE, OPTION.TABLET, OPTION.DESKTOP].map(item => (
        <span
          className="mr-4 cursor-pointer hidden xl:inline-block"
          key={item}
          onClick={() => setOption(item)}
          style={{
            color: item == option && '#40a9ff',
          }}
        >
          {item}
        </span>
      ))}

      <DatePicker.RangePicker
        className="mr-4"
        onChange={() => setOption(OPTION.PICK)}
        defaultValue={[moment(from), moment(to)]}
        format={dateFormat}
      />
    </div>
  );

  return (
    <>
      {activeTab !== 'visit' && (
        <HeatmapBar showedScroll={activeTab == 'scrolling'} />
      )}

      <Tabs
        defaultActiveKey="scrolling"
        tabBarExtraContent={<ExtraContent />}
        onChange={activeKey => setActiveTab(activeKey)}
        animated={false}
      >
        <Tabs.TabPane
          tab={getTabHead('Visits')}
          key="visit"
          className="px-4 pb-2"
        >
          <VisitDetail />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={getTabHead('Clicking')}
          key="clicking"
          className="px-4 pb-2"
        >
          <ClickDetail data={click} imageUrl={imageUrl} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={getTabHead('Hovering')}
          key="hovering"
          className="px-4 pb-2"
        >
          <HoverDetail data={hover} imageUrl={imageUrl} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={getTabHead('Content Reading')}
          key="scrolling"
          className="px-4 pb-2"
        >
          <ScrollDetail data={click} imageUrl={imageUrl} />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};
