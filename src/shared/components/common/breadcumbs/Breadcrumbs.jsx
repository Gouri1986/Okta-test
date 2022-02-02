import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';

import './Breadcrumbs.scss';
import {HomeIcon, BreadcrumbSeperatorIcon} from './assets';



import Link from '@mui/material/Link';

const BreadCrumbs = (props) => {
  const { parentTitle, parentPath, tableTitle1, tableTitle2 } = props;
  return (
    <div>
      <Breadcrumbs
        separator={<BreadcrumbSeperatorIcon />}
        aria-label='breadcrumb'>
        <Typography key={1}>
          <Link to={parentPath}>
            {parentTitle === 'Dashboard' ? <HomeIcon size={16} /> : parentTitle}
          </Link>
        </Typography>
        <Typography key={2}
          color="#080430"
          fontSize="16px"
          fontWeight="500"
        >
          {tableTitle1}
        </Typography>
        <Typography key={3}
          color="#6C6C6C"
          fontSize="16px"
          fontWeight="500"
        >
          {tableTitle2}
        </Typography>
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;