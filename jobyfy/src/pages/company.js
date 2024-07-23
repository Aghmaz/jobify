import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Content } from "antd/es/layout/layout";
import { SideBar } from "../components/SideBar";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanies } from "../store/clients/clientsSlice";
import CompanyCategory from "../components/Company/company-category";
import CompanyDetail from "../components/Company/company-detail";

export default function Company() {
  const data = useSelector((state) => state.client.clients);
  const [detailRecord, setDetailRecord] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
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
              <CompanyCategory
                data={data}
                setDetailRecord={(vendorData) => setDetailRecord(vendorData)}
              />
            ) : (
              <CompanyDetail
                data={data?.find((item) => item?.id === detailRecord.id)}
                goBack={() => setDetailRecord(null)}
              />
            )}
          </Content>
        </PerfectScrollbar>
      </div>
    </div>
  );
}
