import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <main className="content">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;