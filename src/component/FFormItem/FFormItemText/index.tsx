import React from 'react';

interface IFFormItemTextProps {
  value?: string;
  onChange?(): void;
}
const FFormItemText = ({ value }: IFFormItemTextProps) => {
  return <div>{value}</div>;
};

export default FFormItemText;
