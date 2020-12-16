import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Table } from '@buffetjs/core';
import { Header } from '@buffetjs/custom';


const Wrapper = styled.div`
  padding: 18px 30px;

  p {
    margin-top: 1rem;
  }
`;

const headers = [
  {
    name: 'name',
    value: 'name',
  },
  {
    name: 'Description',
    value: 'description',
  },
  {
    name: 'url',
    value: 'html_url',
  },
];

const HomePage = () => {
  const [rows, setRows] = useState([]);
  
  useEffect(() => {
    axios.get("https://api.github.com/users/React-avancado/repos")
    .then(response => setRows(response.data))
    .catch(err => strapi.notification.error(`Ops.. we got an error ${err}`))
  }, []);

  return (
    <Wrapper>
      <Header 
        title={{label: "React Avançado Repositories"}}
        content="A list of all repositories in the React avançado course" />

      <Table headers={headers} rows={rows} />
  
    </Wrapper>
  );
};

export default memo(HomePage);
