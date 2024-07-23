import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Flex,
  Typography,
  Layout,
  Spin,
} from "antd";
import { Svgs } from "../Svgs/svg-icons";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { update_Company } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAllCompanies } from "../../store/clients/clientsSlice";

const { Text } = Typography;
const { Content } = Layout;

const EditCompany = ({ data }) => {
  console.log(data, "data here");
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: String(data.name),
    contactEmail: String(data.contactEmail),
    address: String(data.address),
  });
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let id = data._id;
      const resultAction = await dispatch(
        update_Company({ id, ...formValues })
      );
      if (resultAction && resultAction?.payload) {
        await dispatch(getAllCompanies());
        toast.success("Company has been updated");
        setFormValues({
          name: String(data.name),
          contactEmail: String(data.contactEmail),
          address: String(data.address),
        });
        setIsModalOpen(false);
      } else if (resultAction?.error?.message) {
        toast.error(resultAction?.error?.message || "something went wrong");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div onClick={showModal} className="flex gap-2">
        {Svgs.editg}
        Edit Company
      </div>
      <Modal destroyOnClose open={isModalOpen} onCancel={handleCancel}>
        <Content className="flex flex-col">
          <Text className="text-primary md:text-[32px] text-xl font-medium text-center">
            Edit Company
          </Text>
          <div className="flex flex-col justify-center items-center mt-5">
            <Text className="text-sm font-normal text-[#303030] text-center mb-2">
              Please fill the details below to edit company.
            </Text>
          </div>
          <Form
            name="login"
            size="large"
            layout="vertical"
            onFinish={handleSubmit}
            style={{
              width: "100%",
              maxWidth: "500px",
              margin: "15px auto 0 auto",
              fontWeight: "500",
              fontSize: "14px",
            }}
            className="flex flex-col gap-3"
          >
            <Form.Item label="Name:">
              <Input
                size="large"
                placeholder="John Shoshone"
                className="super__select text-sm font-normal text-dark h-14"
                prefix={<UserOutlined className="text-[#263238]" />}
                defaultValue={formValues.name}
                onChange={(e) =>
                  setFormValues({ ...formValues, name: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Email:">
              <Input
                size="large"
                placeholder="User@gamil. com"
                className="super__select text-sm font-normal text-dark h-14"
                prefix={<MailOutlined className="text-[#263238]" />}
                defaultValue={formValues.contactEmail}
                onChange={(e) =>
                  setFormValues({ ...formValues, contactEmail: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Address" className="relative">
              <Input
                size="large"
                placeholder="Lahore"
                value={formValues.address}
                className="super__select text-sm font-normal text-dark h-14"
                onChange={(e) =>
                  setFormValues({ ...formValues, address: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item>
              <Flex vertical style={{ marginTop: 20 }}>
                <Spin spinning={loading}>
                  <div className="flex">
                    <Button
                      className="bg-primary border border-primary text-white hover:bg-white hover:text-primary rounded-xl !h-14 transition-all ease-out w-full max-w-[320px] mx-auto"
                      type=""
                      htmlType="submit"
                      block
                    >
                      Update
                    </Button>
                  </div>
                </Spin>
              </Flex>
            </Form.Item>
          </Form>
        </Content>
      </Modal>
    </div>
  );
};

export default EditCompany;
