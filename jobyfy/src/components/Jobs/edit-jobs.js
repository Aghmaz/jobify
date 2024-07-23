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
  Select,
} from "antd";
import { Svgs } from "../Svgs/svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Option } from "antd/es/mentions";
import { fetchJobsAsync, updateJobAsync } from "../../store/jobss/jobsSlice";

const { Text } = Typography;
const { Content } = Layout;

const EditJob = ({ data }) => {
  console.log(data, "data here");
  const companies = useSelector((state) => state.client.clients);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    title: String(data.title),
    description: String(data.description),
    company: data.company ? String(data.company) : "",
    location: String(data.location),
    salary: Number(data.salary),
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
      console.log(formValues, "beofr");
      const resultAction = await dispatch(
        updateJobAsync({ id, ...formValues })
      );
      if (resultAction && resultAction?.payload) {
        await dispatch(fetchJobsAsync());
        toast.success("Job has been updated");
        setFormValues({
          title: String(data.title),
          description: String(data.description),
          company: String(data.company),
          location: String(data.location),
          salary: Number(data.salary),
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
        Edit Job
      </div>
      <Modal destroyOnClose open={isModalOpen} onCancel={handleCancel}>
        <Content className="flex flex-col">
          <Text className="text-primary md:text-[32px] text-xl font-medium text-center">
            Edit Job
          </Text>
          <div className="flex flex-col justify-center items-center mt-5">
            <Text className="text-sm font-normal text-[#303030] text-center mb-2">
              Please fill the details below to edit Job.
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
                defaultValue={formValues.company}
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

export default EditJob;
