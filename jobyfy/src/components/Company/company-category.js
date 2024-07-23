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
import EditCustomer from "./edit-company";
import DeleteCustomer from "./delete-company";
import AddCompany from "./add-company";

const { Search } = Input;
const { Text } = Typography;

function CompanyCategory({ data, setDetailRecord }) {
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

  const userDropdown = (record) => (
    <Menu className="!py-3 border border-[#DBDBDB] rounded-[5px] !shadow-none">
      <Menu.Item key="1">
        <EditCustomer data={record} />
      </Menu.Item>
      <Menu.Item key="2">
        <DeleteCustomer data={record} />
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
      item?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(data);
  };

  const getColumns = () => {
    return [
      {
        title: "Name",
        dataIndex: "name",
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
        title: "Email address",
        dataIndex: "contactEmail",
        key: "0",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "0",
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
            title: <a href="">Company</a>,
          },
        ]}
      />
      <Row className="flex justify-between items-center mb-4">
        <Col>
          <Text className="text-primary md:text-[32px] text-xl font-medium ">
            Company
          </Text>
        </Col>
        <Col>
          <AddCompany />
        </Col>
      </Row>
      {!!data?.length && (
        <div className="flex gap-3 mb-5">
          <Search
            allowClear
            value={searchTerm}
            className="search-input-custom w-full max-w-[400px]"
            placeholder="Search Company"
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

export default CompanyCategory;
