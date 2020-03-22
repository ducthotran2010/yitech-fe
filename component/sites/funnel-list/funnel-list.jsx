import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Table, Button, Input, Menu, Popover } from 'antd';
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useRouter } from 'next/router';

import { useAccountContext } from '../../profile/profile-context';
import { getAccessToken } from '../../../utils/account-utils';
import { getFunnelInfo } from '../../../common/query-lib/funnel/get-funnel-info';
import { AddFunnel } from './add-funnel-modal';

const parseResponseData = ({
  trackingFunnelInfoId,
  name,
  steps,
  createdAt,
}) => {
  return {
    id: trackingFunnelInfoId,
    name,
    createdBy: 'Duc Tho Tran',
    createdAt: new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(createdAt * 1000),
    rate: Math.floor(Math.random() * 1000) / 100,
  };
};

export const FunnelList = () => {
  const { setting } = useAccountContext();
  const router = useRouter();
  const searchInput = useRef();

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const activeWebsite = setting ? setting.activeWebsite : undefined;
  const webID = activeWebsite ? activeWebsite.webID : undefined;

  const fetch = async id => {
    setLoading(true);
    const token = getAccessToken();
    try {
      const response = await getFunnelInfo(id, token);
      if (response.status === 200 || response.status === 304) {
        const rawData = response.data;
        const parsedData = rawData.map(row => parseResponseData(row));
        setData(parsedData);
      }

      if (response.status === 400) {
        console.error.log('Bad request');
        return null;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (webID !== undefined) {
      fetch(webID);
    }
  }, [webID]);

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className="p-8">
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          className="mb-8 block"
          style={{ width: 188 }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          className="mr-8"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible && searchInput) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'Funnel Name',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
      render: (_, { id: funnelID, name }) => (
        <div>
          <h5
            className="text-lg cursor-pointer hover:text-blue-600 hover:underline"
            onClick={() =>
              router.push(
                '/sites/[id]/conversion-rate/[funnelID]',
                `/sites/${webID}/conversion-rate/${funnelID}`,
              )
            }
          >
            {name}
          </h5>
        </div>
      ),
    },
    {
      title: 'Created',
      sorter: true,
      width: '20%',
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (_, { createdBy, createdAt }) => (
        <div>
          <div className="font-bold">{createdAt}</div>
          <div className="text-sm text-gray-600">{createdBy}</div>
        </div>
      ),
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      sorter: true,
      sorter: (a, b) => a.rate - b.rate,
    },
    {
      render: () => (
        <Popover
          overlayClassName="custom-popover"
          content={
            <Menu mode="inline" className="border-r-0">
              <Menu.Item>Edit</Menu.Item>
              <Menu.Item>Delete</Menu.Item>
            </Menu>
          }
        >
          <Button
            onClick={event => event.stopPropagation()}
            type="normal"
            shape="circle"
            className="border-0"
            icon={<MoreOutlined style={{ display: 'block' }} />}
          />
        </Popover>
      ),
    },
  ];

  const addTracking = row => {
    setData([parseResponseData(row), ...data]);
  };

  return (
    <>
      <AddFunnel addTracking={addTracking} />
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={data}
        loading={loading}
        pagination={{ position: 'both' }}
      />
    </>
  );
};
