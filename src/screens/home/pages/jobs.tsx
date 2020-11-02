import React from 'react';
import { Divider, Space, Table, Tag, Typography } from 'antd';
import PageSkeleton from '../pageSkeleton';
const { Title, Paragraph } = Typography;

export default function Jobs() {
  return (
    <PageSkeleton
      className="pj-white"
      defaultLoginModal={false}
      defaultSideBar={false}
      pageTitle="Jobs"
    >
      <div className="container">
        <Typography>
          <Title>Why PakkiJodi</Title>
          <Paragraph>
            Rarely, does one get the chance to work at scale and deliver growth in the same job. To
            fuel this, we are constantly building small entrepreneurial teams to solve large
            problems at scale. You will be working alongside the Industry’s best in Technology,
            Product Design, Marketing, Customer Service – each committed to delivering incredible
            and measurable impact.
          </Paragraph>
        </Typography>
        <Divider />
        <Typography>
          <Title>Culture @ PakkiJodi </Title>
          <Paragraph>
            Our teams are bold, innovative, dynamic and working with them constantly raises one’s
            own game. We’ve figured that the best way to get results is by leveraging scale and
            encouraging our culture of startup-thinking. While our planning is agile and iterative,
            we also love to chase some BIG HAIRY GOALS each quarter. And have fun while we are at
            it. We are constantly evolving our CULTURE, but the tenets remain intrinsic to our DNA.
            Have a look-see to figure if it matches yours.
          </Paragraph>
        </Typography>
        <Divider />
        <Typography>
          <Title>Current Openings</Title>
        </Typography>
        <Table columns={columns} dataSource={data} />
      </div>
    </PageSkeleton>
  );
}

const columns = [
  {
    title: 'Job title',
    dataIndex: 'name',
    key: 'name',
    render: (text: any) => <span>{text}</span>,
  },
  {
    title: 'Min Exp',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Description',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: any) => (
      <>
        {tags.map((tag: any) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: any, record: any) => (
      <Space size="middle">
        <Tag>Expired</Tag>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'Software Devloper',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['react', 'developer', 'nodejs', 'html'],
  },
  {
    key: '2',
    name: 'Digital Marketing Lead',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['SEO', 'SMO'],
  },
  {
    key: '3',
    name: 'Tech Head',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
