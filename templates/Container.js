import React from 'react';

export default (props) => {
  const className = props.className? `container ${props.className}` : 'container';
  return <div className={className} style={props.style}>
    {props.children}
  </div>
};