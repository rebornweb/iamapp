import React, { FC } from 'react';
import UserInfoComponent from './Auth';

const Header: FC = () => {
  return (
    <header>
      <h1>IAMA</h1>
      <UserInfoComponent/>
    </header>
  );
};

export default Header;
