import React from "react";
import { Link } from "react-router-dom";

interface HyperLinkProps {
  text?: any;
  to: string;
  className?: string;
  type?: 'product' | 'default';
  children?: React.ReactNode;
  target?: '_blank' | '_self' | '_parent' | '_top' | 'none';
  aos?: boolean | string;
  onClick?: any
}

const HyperLink: React.FC<HyperLinkProps> = (props) => {
  const {
    text,
    to,
    className,
    type = 'default',
    children,
    target = 'none',
    aos = false,
    ...restProps
  } = props;

  const htmlTarget = target === 'none' ? undefined : target;

  if (type === 'product') {
    return (
      <Link
        className={className}
        to={to}
        style={{
          textDecoration: 'none',
          color: 'inherit'
        }}
        target={htmlTarget}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <Link
        to={to}
        style={{
          textDecoration: 'none',
          color: 'inherit'
        }}
        target={htmlTarget}
        data-aos={aos ? (typeof aos === 'string' ? aos : "fade-left") : undefined}
        className={className}
        {...restProps}
      >
        {children ? children : text}
      </Link>
    );
  }
};

export default HyperLink;