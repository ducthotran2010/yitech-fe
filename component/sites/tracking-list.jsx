import { useState, useEffect, useRef } from 'react';
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Table, Button, Input, Menu, Popover } from 'antd';
import { useRouter } from 'next/router';
import { Progress } from 'antd';

export const TrackingList = ({ id }) => {
  const router = useRouter();
  const searchInput = useRef();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
                `/sites/${id}/heatmaps/${trackID}`,
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
      // render: (text, record) => {
      //   const ratio = record.views / 100;
      //   const status =
      //     ratio < 30 ? 'exception' : ratio < 60 ? 'normal' : 'success';
      //   return (
      //     <div>
      //       <span>{text}</span>
      //       <Progress percent={ratio} showInfo={false} status={status} />
      //     </div>
      //   );
      // },
    },
    {
      render: () => (
        <Popover
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

  const fetch = () => {
    setLoading(true);
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        id: i,
        name: `Product ${i}`,
        url: 'https://www.google.com/',
        description:
          'Description is the pattern of narrative development that aims to make vivid a place, object, character, or group. Description is one of four rhetorical modes along Description is the pattern of narrative development that aims to make vivid a place, object, character, or group. Description is one of four rhetorical modes along ...',
        createdBy: 'Duc Tho Tran',
        createdAt: new Date(
          new Date().getTime() - Math.round(Math.random() * 1000000000000),
        ).toLocaleDateString(),
        views: Math.round(Math.random() * 10000),
      });
    }

    setData(data);
    setLoading(false);
  };

  useEffect(() => fetch(), []);

  return (
    <Table
      columns={columns}
      rowKey={record => record.id}
      dataSource={data}
      loading={loading}
      pagination={{ position: 'both' }}
      // onChange={handleTableChange}
    />
  );
};
