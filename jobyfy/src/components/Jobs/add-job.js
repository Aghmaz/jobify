import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Flex,
  Typography,
  Layout,
  Spin,
  Select,
} from "antd";
import { Svgs } from "../Svgs/svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createJobAsync } from "../../store/jobss/jobsSlice";
import { getAllJobs } from "../../store/jobss/jobsSlice";

const { Text } = Typography;
const { Content } = Layout;
const { Option } = Select;
const CreateJob = () => {
  const companies = useSelector((state) => state.client.clients);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState("");

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setFormValues({
      title: "",
      description: "",
      company: "",
      location: "",
      salary: "",
    });
    setIsModalOpen(false);
  };

  const onFinish = async () => {
    try {
      setLoading(true);

      const resultAction = await dispatch(createJobAsync(formValues));
      const response = resultAction.payload;
      if (resultAction.error) {
        toast.error(resultAction.error.message);
      } else if (resultAction) {
        if (response) {
          toast.success("Company has been created.");
          // dispatch(getAllJobs());
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
        Add New Job
      </Button>
      <Modal open={isModalOpen} onCancel={handleCancel}>
        <Content className="flex flex-col">
          <Text className="text-primary md:text-[32px] text-xl font-medium text-center">
            Add New Job
          </Text>
          <div className="flex flex-col justify-center items-center mt-5">
            <Text className="text-sm font-normal text-[#303030] text-center mb-2">
              Please fill the details below to add new Job.
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
            <Form.Item label="Title:">
              <Input
                size="large"
                placeholder="Full Stack Developer"
                className="super__select text-sm font-normal text-dark h-14"
                value={formValues.title}
                onChange={(e) =>
                  setFormValues({ ...formValues, title: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Description:">
              <Input
                size="large"
                placeholder="Remote job , 3 year experience"
                className="super__select text-sm font-normal text-dark h-14"
                value={formValues.description}
                onChange={(e) =>
                  setFormValues({ ...formValues, description: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="location:">
              <Input
                size="large"
                placeholder="USA"
                className="super__select text-sm font-normal text-dark h-14"
                value={formValues.location}
                onChange={(e) =>
                  setFormValues({ ...formValues, location: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Salary:">
              <Input
                size="large"
                placeholder="3000$"
                className="super__select text-sm font-normal text-dark h-14"
                value={formValues.salary}
                onChange={(e) =>
                  setFormValues({ ...formValues, salary: e.target.value })
                }
              />
            </Form.Item>
            {/* <Form.Item label="company:" className="relative">
              <Input
                size="large"
                placeholder="devAace"
                className="super__select text-sm font-normal text-dark h-14"
                value={formValues.company}
                onChange={(e) =>
                  setFormValues({ ...formValues, company: e.target.value })
                }
              />
            </Form.Item> */}
            <Form.Item
              label="Company"
              name="company"
              rules={[{ required: true, message: "Please select a company!" }]}
            >
              <Select
                placeholder="Select a company"
                onChange={(value) =>
                  setFormValues({ ...formValues, company: value })
                }
                value={formValues.company}
              >
                {companies.map((company) => (
                  <Option key={company._id} value={company._id}>
                    {company.name}
                  </Option>
                ))}
              </Select>
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

export default CreateJob;
