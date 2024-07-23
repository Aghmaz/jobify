import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Content } from "antd/es/layout/layout";
import { SideBar } from "../components/SideBar";
import PerfectScrollbar from "react-perfect-scrollbar";
import CreateJob from "../components/Jobs/add-job";
import JobDetail from "../components/Jobs/job-detail";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanies } from "../store/clients/clientsSlice";
import { fetchJobsAsync } from "../store/jobss/jobsSlice";
import JobCategory from "../components/Jobs/job-category";
export default function MainJob() {
  const [detailRecord, setDetailRecord] = useState(null);
  const allJobs = useSelector((state) => state.job.jobs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobsAsync());
    dispatch(getAllCompanies());
  }, []);
  return (
    <div className="h-full min-h-screen grid grid-columns">
      <SideBar />
      <div className="relative flex flex-col">
        <Header />
        <PerfectScrollbar style={{ height: "100vh" }}>
          <Content className="px-4 pt-28 pb-6">
            {!detailRecord ? (
              <JobCategory
                data={allJobs}
                setDetailRecord={(vendorData) => setDetailRecord(vendorData)}
              />
            ) : (
              <JobDetail />
            )}
          </Content>
        </PerfectScrollbar>
      </div>
    </div>
  );
}
