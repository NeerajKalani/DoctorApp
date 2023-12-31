import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Col, Row } from 'antd';
import Doctor from '../components/Doctor';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([]);

  const getData = async () => {
    try {
      const baseUrl = 'https://doctorapp-9o4g.onrender.com';
      dispatch(showLoading());
      const response = await axios.get(
        `${baseUrl}/api/user/get-all-approved-doctors`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) setDoctors(response.data.data);

      console.log(response.data.data);
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <Row gutter={20}>
        {doctors.map((doctor) => {
          return (
            <Col span={8} xs={24} lg={8}>
              <Doctor doctor={doctor} />
            </Col>
          );
        })}
      </Row>
    </Layout>
  );
};

export default Home;
