import React, { ReactNode } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container fluid="md">
      <Header />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </Container>
  );
};

export default Layout;
