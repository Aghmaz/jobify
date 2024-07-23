import React, { useEffect, useState } from "react";
import {
  Layout,
  Space,
  Table,
  Menu,
  Dropdown,
  Input,
  Row,
  Col,
  Typography,
  Breadcrumb,
  Avatar,
} from "antd";
import { Svgs } from "../Svgs/svg-icons";
import EditJob from "./edit-jobs";
import DeleteJob from "./delete-job";
import CreateJob from "./add-job";
import { useSelector } from "react-redux";

const { Search } = Input;
const { Text } = Typography;

function JobCategory({ data, setDetailRecord }) {
  const companies = useSelector((state) => state.client.clients);

  const [searchTerm, setSearchTerm] = useState("");
  const [orginalData, setOrginalData] = useState(data);
  const [filteredData, setFilteredData] = useState(data);
  const [clearFilter, setClearFilter] = useState(false);
  const handleActiveFileter = (booleanValue) => setClearFilter(booleanValue);

  const formatDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
  const findCompanyName = (companyId) => {
    const company = companies.find((company) => company._id === companyId);
    return company ? company.name : "";
  };

  const userDropdown = (record) => (
    <Menu className="!py-3 border border-[#DBDBDB] rounded-[5px] !shadow-none">
      <Menu.Item key="1">
        <EditJob data={record} />
      </Menu.Item>
      <Menu.Item key="2">
        <DeleteJob data={record} />
      </Menu.Item>
    </Menu>
  );

  const handleSearch = (value) => {
    setSearchTerm(value);
    handleActiveFileter(!!value);
    filterData();
  };
  useEffect(() => {
    filterData();
  }, [searchTerm, data, clearFilter]);
  useEffect(() => {
    setFilteredData(data);
    setOrginalData(data);
  }, []);
  const filterData = () => {
    data = data.filter((item) =>
      item?.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(data);
  };

  const getColumns = () => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "0",
        render: (text) => (
          <Space className="flex gap-1 items-center">
            <Avatar
              className="rounded-full w-9 h-9 flex justify-center items-center"
              size="large"
              src="./assets/images/avatar-vendor.svg"
            />
            <span>{text}</span>{" "}
          </Space>
        ),
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "0",
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "0",
      },
      {
        title: "Salary",
        dataIndex: "salary",
        key: "0",
      },
      {
        title: "Company",
        dataIndex: "company",
        key: "company",
        render: (companyId) => findCompanyName(companyId),
      },

      {
        title: "",
        dataIndex: "data",
        key: "data",
        align: "right",
        render: (text, rowData, rowIndex) => (
          <Space size="middle">
            <Dropdown
              overlay={() => userDropdown(rowData, rowIndex)}
              placement="bottomRight"
              trigger={["click"]}
              className="cursor-pointer"
            >
              <Space className="gap-3 items-center">{Svgs.dots}</Space>
            </Dropdown>
          </Space>
        ),
      },
    ];
  };
  return (
    <Layout>
      <Breadcrumb
        className="mb-4"
        items={[
          {
            title: <a href="">User Management</a>,
          },
          {
            title: <a href="">Job</a>,
          },
        ]}
      />
      <Row className="flex justify-between items-center mb-4">
        <Col>
          <Text className="text-primary md:text-[32px] text-xl font-medium ">
            Job
          </Text>
        </Col>
        <Col>
          <CreateJob />
        </Col>
      </Row>
      {!!data?.length && (
        <div className="flex gap-3 mb-5">
          <Search
            allowClear
            value={searchTerm}
            className="search-input-custom w-full max-w-[400px]"
            placeholder="Search Service"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      )}
      <div>
        {filteredData.length > 0 ? (
          <Table
            className="service-table"
            columns={getColumns()}
            dataSource={filteredData}
            pagination={{
              defaultCurrent: 1,
              pageSize: 10,
              total: orginalData.length,
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
}

export default JobCategory;
