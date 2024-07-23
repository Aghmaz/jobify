import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addCompany } from "../../store/user/userSlice";
import { getAllCompanies } from "../../store/clients/clientsSlice";

const { Text } = Typography;
const { Content } = Layout;

const AddCompany = () => {
  const dispatch = useDispatch();
  const createdByID = parseInt(localStorage.getItem("userId"), 10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    contactEmail: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setFormValues({
      name: "",
      address: "",
      contactEmail: "",
    });
    setIsModalOpen(false);
  };

  const onFinish = async () => {
    try {
      setLoading(true);

      const resultAction = await dispatch(addCompany(formValues));
      const response = resultAction.payload;
      if (resultAction.error) {
        toast.error(resultAction.error.message);
      } else if (resultAction) {
        if (response) {
          toast.success("Company has been created.");
          dispatch(getAllCompanies());
          handleCancel();
        } else {
          toast.error(response?.message || "Something went wrong");
        }
      }
    } catch (error) {
      console.error("Form submission error:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Button
        onClick={showModal}
        className="bg-primary flex justify-center items-center w-full max-w-[180px] py-5 text-base font-normal text-white rounded-lg"
        type=""
        icon={Svgs.addiconw}
      >
        Add New Company
      </Button>
      <Modal open={isModalOpen} onCancel={handleCancel}>
        <Content className="flex flex-col">
          <Text className="text-primary md:text-[32px] text-xl font-medium text-center">
            Add New Company
          </Text>
          <div className="flex flex-col justify-center items-center mt-5">
            <Text className="text-sm font-normal text-[#303030] text-center mb-2">
              Please fill the details below to add new Comapny.
            </Text>
          </div>
          <Form
            name="login"
            size="large"
            layout="vertical"
            onFinish={onFinish}
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
                value={formValues.name}
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
                value={formValues.contactEmail}
                onChange={(e) =>
                  setFormValues({ ...formValues, contactEmail: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Address:" className="relative">
              <Input
                size="large"
                placeholder="address"
                className="super__select text-sm font-normal text-dark h-14"
                value={formValues.address}
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
                      Save
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

export default AddCompany;
