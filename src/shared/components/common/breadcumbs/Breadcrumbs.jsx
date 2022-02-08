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
        <Link key={1} href="#">
          {parentTitle === 'Dashboard' ? <HomeIcon size={16} /> : parentTitle}
        </Link>
        <Link key={2} href="#" underline="none">{tableTitle1}</Link>
        <Link key={3} href="#" underline="none">{tableTitle2}</Link>
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;