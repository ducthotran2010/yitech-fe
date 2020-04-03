import { Tabs, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import moment from 'moment';

import { Funnel } from './funnel';
import { getFunnelDetail } from '../../../common/query-lib/funnel/get-funnel-detail';
import { getAccessToken } from '../../../utils/account-utils';

const dateFormat = 'DD/MM/YYYY';
const OPTION = {
  LAST_DAY: 'Last Day',
  LAST_WEEK: 'Last Week',
  LAST_MONTH: 'Last Month',
  LAST_YEAR: 'Last Year',
  PICK: 'Pick',
};

const queryStatistic = async ({ id, trackID, from, to }) => {
  const token = getAccessToken();
  const response = await getFunnelDetail(
    id,
    trackID,
    Math.floor(from.startOf('day').valueOf() / 1000),
    Math.floor(to.endOf('day').valueOf() / 1000),
    token,
  );
  if (response.status === 200 || response.status === 304) {
    return response.data;
  }
  return null;
};

export const FunnelTabs = ({ id, trackID, setName }) => {
  const [from, setFrom] = useState(moment().subtract(7, 'days'));
  const [to, setTo] = useState(moment());
  const [option, setOption] = useState(OPTION.LAST_WEEK);
  const [activeTab, setActiveTab] = useState('funnel');
  const [data, setData] = useState([]);

  const getTabHead = title => (
    <div className="text-center" style={{ padding: '0px 20px', minWidth: 80 }}>
      {title}
    </div>
  );

  const fetchStatistic = async () => {
    const data = await queryStatistic({ id, trackID, from, to });
    if (data) {
      const { name, statistic } = data;
      setName(name);
      return setData(statistic);
    }

    message.error('Cannot fetch funnel statistics');
  };

  useEffect(() => {
    fetchStatistic();
  }, [from, to]);

  useEffect(() => {
    switch (option) {
      case OPTION.LAST_DAY:
        setTo(moment());
        setFrom(moment().subtract(1, 'day'));
        break;
      case OPTION.LAST_WEEK:
        setTo(moment());
        setFrom(moment().subtract(7, 'days'));
        break;
      case OPTION.LAST_MONTH:
        setTo(moment());
        setFrom(moment().subtract(1, 'month'));
        break;
      case OPTION.LAST_YEAR:
        setTo(moment());
        setFrom(moment().subtract(1, 'year'));
        break;
    }
  }, [option]);

  const ExtraContent = () => (
    <div className="hidden md:block">
      {[
        OPTION.LAST_DAY,
        OPTION.LAST_WEEK,
        OPTION.LAST_MONTH,
        OPTION.LAST_YEAR,
      ].map(item => (
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
        onChange={([from, to]) => {
          setOption(OPTION.PICK);
          setFrom(from);
          setTo(to);
        }}
        value={[from, to]}
        format={dateFormat}
      />
    </div>
  );

  return (
    <Tabs
      defaultActiveKey="funnel"
      tabBarExtraContent={<ExtraContent />}
      onChange={activeKey => setActiveTab(activeKey)}
    >
      <Tabs.TabPane
        tab={getTabHead('Funnel')}
        key="funnel"
        className="px-4 pb-2"
      >
        <Funnel data={data} />
      </Tabs.TabPane>
    </Tabs>
  );
};
