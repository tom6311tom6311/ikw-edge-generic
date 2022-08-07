import React from 'react';

type BreadcrumbProps = {
  children?: React.ReactNode;
}

export default function Breadcrumb({ children }: BreadcrumbProps) {
  return (
    <p className="c-tabheader-breadcrumb">
      {children}
    </p>
  );
}

Breadcrumb.defaultProps = {
  children: '',
};
