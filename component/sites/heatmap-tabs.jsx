import { Tabs, DatePicker } from 'antd';
import { useRef, useState, useEffect } from 'react';
import moment from 'moment';

const dateFormat = 'DD/MM/YYYY';
const OPTION = {
  LAST_DAY: 'Last Day',
  LAST_WEEK: 'Last Week',
  LAST_MONTH: 'Last Month',
  LAST_YEAR: 'Last Year',
  PICK: 'Pick',
};

export const HeatmapTabs = () => {
  const containerRef = useRef(null);
  const [_, setWidth] = useState(0);
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [option, setOption] = useState(OPTION.LAST_YEAR);

  const getTabHead = title => (
    <div className="text-center" style={{ padding: '0px 20px', minWidth: 80 }}>
      {title}
    </div>
  );

  useEffect(() => {
    if (containerRef) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const date = new Date();
    switch (option) {
      case OPTION.LAST_DAY:
        setTo(date);
        setFrom(new Date().setDate(date.getDate() - 1));
        break;
      case OPTION.LAST_WEEK:
        setTo(date);
        setFrom(new Date().setDate(date.getDate() - 7));
        break;
      case OPTION.LAST_MONTH:
        setTo(date);
        setFrom(new Date().setMonth(date.getMonth() - 1));
        break;
      case OPTION.LAST_YEAR:
        setTo(date);
        setFrom(new Date().setYear(date.getYear() - 1 + 1900));
        break;
    }
    console.log({ from, to });
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
        onChange={() => setOption(OPTION.PICK)}
        defaultValue={[moment(from), moment(to)]}
        format={dateFormat}
      />
    </div>
  );

  return (
    <div ref={containerRef}>
      <Tabs defaultActiveKey="1" tabBarExtraContent={<ExtraContent />}>
        <Tabs.TabPane tab={getTabHead('Visits')} key="visit" className="p-4">
          <div style={{ height: 1000 }}>Content of Tab Pane 1</div>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={getTabHead('Clicking')}
          key="clicking"
          className="p-4"
        >
          Content of Tab Pane 2
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={getTabHead('Hovering')}
          key="hovering"
          className="p-4"
        >
          Content of Tab Pane 3
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={getTabHead('Content Reading')}
          key="content-readings"
          className="p-4"
        >
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
