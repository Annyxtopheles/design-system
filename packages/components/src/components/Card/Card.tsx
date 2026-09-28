import React from 'react';
import './Card.scss';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Padding inside the card */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Box shadow level */
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  /** Border radius level */
  radius?: 'none' | 'sm' | 'md' | 'lg';
  /** Whether the card has a border */
  bordered?: boolean;
  /** Whether the card lifts on hover */
  hoverable?: boolean;
  /** Top image/media slot */
  media?: React.ReactNode;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
}

const CardBase: React.FC<CardProps> = ({
  children,
  padding = 'md',
  shadow = 'md',
  radius = 'md',
  bordered = false,
  hoverable = false,
  media,
  header,
  footer,
  className = '',
  onClick,
  ...rest
}) => {
  const classes = [
    'ds-Card',
    `ds-Card--padding-${padding}`,
    `ds-Card--shadow-${shadow}`,
    `ds-Card--radius-${radius}`,
    bordered ? 'ds-Card--bordered' : '',
    hoverable ? 'ds-Card--hoverable' : '',
    onClick ? 'ds-Card--clickable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...rest}
    >
      {media && <div className="ds-Card__media">{media}</div>}
      {header && <div className="ds-Card__header">{header}</div>}
      <div className="ds-Card__content">{children}</div>
      {footer && <div className="ds-Card__footer">{footer}</div>}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div className={`ds-Card__header ${className}`.trim()} {...props}>{children}</div>
);

export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div className={`ds-Card__content ${className}`.trim()} {...props}>{children}</div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div className={`ds-Card__footer ${className}`.trim()} {...props}>{children}</div>
);

export const CardMedia: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div className={`ds-Card__media ${className}`.trim()} {...props}>{children}</div>
);

export interface CardComponent extends React.FC<CardProps> {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Content: typeof CardBody;
  Footer: typeof CardFooter;
  Media: typeof CardMedia;
}

export const Card = CardBase as CardComponent;
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Content = CardBody;
Card.Footer = CardFooter;
Card.Media = CardMedia;

export default Card;
