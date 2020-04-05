import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Table, Button, Input, Menu, Popover, message } from 'antd';
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import { useRouter } from 'next/router';
import { useAccountContext } from '../../profile/profile-context';
import { getAccessToken } from '../../../utils/account-utils';
import { getTrackingInfo } from '../../../common/query-lib/heatmap-data/get-tracking-info';
import { AddHeapMap } from './add-heatmap';
import { deleteTrackingInfo } from '../../../common/query-lib/heatmap-data/delete-tracking-info';
import { EditHeatmapModal } from './edit-heatmap-name';

const parseResponseData = ({
  trackingHeatmapInfoId,
  name,
  trackingUrl,
  createdAt,
}) => {
  return {
    id: trackingHeatmapInfoId,
    name,
    url: trackingUrl,
    createdBy: 'Duc Tho Tran',
    createdAt: new Date(createdAt * 1000).toLocaleDateString(),
    views: Math.round(Math.random() * 10000),
  };
};

export const HeatmapList = () => {
  const { setting } = useAccountContext();
  const router = useRouter();
  const searchInput = useRef();

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showedEdit, setShowedEdit] = useState(false);
  const [editName, setEditName] = useState('');
  const [editID, setEditID] = useState();

  const activeWebsite = setting ? setting.activeWebsite : undefined;
  const webID = activeWebsite ? activeWebsite.webID : undefined;

  const fetch = async id => {
    setLoading(true);
    const token = getAccessToken();
    try {
      const response = await getTrackingInfo(id, token);
      if (response.status === 200 || response.status === 304) {
        const rawData = response.data;
        console.log(rawData);
        const parsedData = rawData.map(row => parseResponseData(row));
        setData(parsedData);
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

  const handleDeleteHeatmap = async ({ id: trackingHeatmapInfoID, name }) => {
    const token = getAccessToken();
    try {
      const response = await deleteTrackingInfo({
        trackingHeatmapInfoID,
        token,
      });
      if (response.status === 200 || response.status === 304) {
        setData(data.filter(({ id }) => id !== trackingHeatmapInfoID));
        message.success(`Remove ${name} heatmap successfully`);
      }
    } catch (error) {
      message.error(`Could not remove ${name} heatmap`);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
      render: (_, { id: trackID, name, url }) => (
        <div>
          <h5
            className="text-lg cursor-pointer hover:text-blue-600 hover:underline"
            onClick={() =>
              router.push(
                '/sites/[id]/heatmaps/[trackID]',
                `/sites/${webID}/heatmaps/${trackID}`,
              )
            }
          >
            {name}
          </h5>
          <a
            className="text-sm text-gray-500 cursor-pointer hover:text-blue-600 hover:underline"
            href={url}
          >
            {url}
          </a>
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
      title: 'Page Views',
      dataIndex: 'views',
      sorter: true,
      sorter: (a, b) => a.views - b.views,
      render: text => <p className="font-bold">{text}</p>,
    },
    {
      render: (_, { id, name }) => (
        <Popover
          overlayClassName="custom-popover"
          content={
            <Menu selectable={false} mode="inline" className="border-r-0">
              <Menu.Item
                onClick={() => {
                  setEditID(id);
                  setEditName(name);
                  setShowedEdit(true);
                }}
              >
                Edit
              </Menu.Item>
              <Menu.Item onClick={() => handleDeleteHeatmap({ id, name })}>
                Delete
              </Menu.Item>
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

  const updateHeatmap = ({ heatmapID, name }) => {
    setData(
      data.map(row =>
        row.id == heatmapID
          ? {
              ...row,
              name,
            }
          : row,
      ),
    );
  };

  return (
    <>
      <EditHeatmapModal
        visible={showedEdit}
        setVisible={setShowedEdit}
        name={editName}
        setName={setEditName}
        heatmapID={editID}
        updateHeatmap={updateHeatmap}
      />

      <AddHeapMap addTracking={addTracking} />
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
