import React from 'react';
import styles from './Card.module.css';
import Image from 'next/image';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div className={`${styles.card} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

interface CardImageProps {
  src: string;
  alt: string;
  height?: number;
  width?: number;
}

export const CardImage: React.FC<CardImageProps> = ({ src, alt, height = 200 }) => {
  return (
    <div className={styles.cardImage} style={{ height: `${height}px` }}>
      <Image src={src} alt={alt} width={250} height={200} />
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div className={styles.cardContent}>{children}</div>;
};

interface CardTitleProps {
  children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children }) => {
  return <h3 className={styles.cardTitle}>{children}</h3>;
};

interface CardDescriptionProps {
  children: React.ReactNode;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children }) => {
  return <p className={styles.cardDescription}>{children}</p>;
};

interface CardMetaProps {
  children: React.ReactNode;
}

export const CardMeta: React.FC<CardMetaProps> = ({ children }) => {
  return <div className={styles.cardMeta}>{children}</div>;
};

interface CardActionsProps {
  children: React.ReactNode;
}

export const CardActions: React.FC<CardActionsProps> = ({ children }) => {
  return <div className={styles.cardActions}>{children}</div>;
};