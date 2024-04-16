import React, { ReactNode } from 'react';
import Card from 'react-bootstrap/Card';

interface CardsProps {
  title: string;
  imageUrl: string;
  children: ReactNode;
}

const Cards: React.FC<CardsProps> = ({ title, imageUrl, children }) => {
  return (
    <Card style={{ width: '10rem', marginRight: '20px' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {children}
      </Card.Body>
    </Card>
  );
}

export default Cards;
