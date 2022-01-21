import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import "./BreadCumbs.scss"

const BreadCumbs = (props) => {
  const { parentTitle, parentPath, tableTitle } = props;
  return (
    <div>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Typography key={1} color="text.primary">
          <Link to={parentPath}>{parentTitle}</Link>
        </Typography>
        <Typography key={2} color="text.primary">
          {tableTitle}
        </Typography>
      </Breadcrumbs>
    </div>
  )
}

export default BreadCumbs
