import { useState, useEffect, useRef } from 'react';
import { Table, Button, Input, Menu, Popover, message } from 'antd';
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useRouter } from 'next/router';

import { useAccountContext } from '../../profile/profile-context';
import { getAccessToken } from '../../../utils/account-utils';
import { getFunnelInfo } from '../../../common/query-lib/funnel/get-funnel-info';
import { AddFunnel } from './add-funnel-modal';
import { EditFunnelModal } from './edit-funnel-modal';
import { deleteFunnelInfo } from '../../../common/query-lib/funnel/delete-funnel-info';
import { TYPE_URL } from '../../../common/type-url';

const parseResponseData = ({
  trackingFunnelInfoId,
  name,
  steps,
  authorName,
  createdAt,
  conversionRate,
}) => {
  try {
    return {
      id: trackingFunnelInfoId,
      name,
      createdBy: authorName,
      createdAt: new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(createdAt * 1000),
      steps: JSON.parse(steps).map(({ typeUrl, ...others }) => ({
        typeUrl: Object.keys(TYPE_URL).find(
          (key) => TYPE_URL[key].key == typeUrl,
        ),
        ...others,
      })),
      rate: Math.floor(conversionRate) / 100,
    };
  } catch (error) {
    return {
      id: trackingFunnelInfoId,
      name,
      createdBy: authorName,
      createdAt: new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(createdAt * 1000),
      steps: [],
      rate: conversionRate,
    };
  }
};

export const FunnelList = () => {
  const { setting } = useAccountContext();
  const router = useRouter();
  const searchInput = useRef();

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showedEdit, setShowedEdit] = useState(false);
  const [editName, setEditName] = useState('');
  const [editSteps, setEditSteps] = useState([]);
  const [editID, setEditID] = useState();

  const activeWebsite = setting ? setting.activeWebsite : undefined;
  const webID = activeWebsite ? activeWebsite.webID : undefined;

  const fetch = async (id) => {
    setLoading(true);
    const token = getAccessToken();
    try {
      const response = await getFunnelInfo(id, token);
      if (response.status === 200 || response.status === 304) {
        const rawData = response.data;
        const parsedData = rawData.map((row) => parseResponseData(row));
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

  const getColumnSearchProps = (dataIndex) => ({
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
          onChange={(e) =>
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
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible && searchInput) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: (text) =>
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

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const handleDeleteFunnel = async ({ id: trackingFunnelInfoID, name }) => {
    const token = getAccessToken();
    try {
      const response = await deleteFunnelInfo({
        trackingFunnelInfoID,
        token,
      });
      if (response.status === 200 || response.status === 304) {
        setData(data.filter(({ id }) => id !== trackingFunnelInfoID));
        message.success(`Remove ${name} funnel successfully`);
      }
    } catch (error) {
      message.error(`Could not remove ${name} funnel`);
    }
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
                '/sites/[id]/funnels/[funnelID]',
                `/sites/${webID}/funnels/${funnelID}`,
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
      render: (rate) => `${rate}%`,
    },
    {
      render: (_, { id, name, steps }) => (
        <Popover
          overlayClassName="custom-popover"
          content={
            <Menu selectable={false} mode="inline" className="border-r-0">
              <Menu.Item
                onClick={() => {
                  setEditName(name);
                  setEditSteps(steps);
                  setEditID(id);
                  setShowedEdit(true);
                }}
              >
                Edit
              </Menu.Item>
              <Menu.Item onClick={() => handleDeleteFunnel({ id, name })}>
                Delete
              </Menu.Item>
            </Menu>
          }
        >
          <Button
            onClick={(event) => event.stopPropagation()}
            type="normal"
            shape="circle"
            className="border-0"
            icon={<MoreOutlined style={{ display: 'block' }} />}
          />
        </Popover>
      ),
    },
  ];

  const addTracking = (row) => {
    setData([parseResponseData(row), ...data]);
  };

  const editTracking = (row) => {
    const parsedData = parseResponseData(row);
    setData(
      data.map((row) => (row.id == parsedData.id ? { ...parsedData } : row)),
    );
  };

  return (
    <>
      <EditFunnelModal
        visible={showedEdit}
        setVisible={setShowedEdit}
        name={editName}
        setName={setEditName}
        steps={editSteps}
        setSteps={setEditSteps}
        funnelID={editID}
        editTracking={editTracking}
      />

      <AddFunnel addTracking={addTracking} />
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        loading={loading}
        pagination={{ position: 'both' }}
      />
    </>
  );
};
