import React from "react"
import { Breadcrumbs, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

import "./Breadcumbs.scss"
import HomeIcon from "./HomeIcon"

const BreadCumbs = props => {
  const { parentTitle, parentPath, tableTitle1, tableTitle2 } = props
  return (
    <div>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="medium" />} aria-label="breadcrumb">
        <Typography key={1} color="text.primary">
          <Link to={parentPath}>{parentTitle === "Dashboard" ? <HomeIcon size={16} /> : parentTitle}</Link>
        </Typography>
        <Typography key={2} color="text.primary">
          {tableTitle1}
        </Typography>
        <Typography key={3} color="text.primary">
          {tableTitle2}
        </Typography>
      </Breadcrumbs>
    </div>
  )
}

export default BreadCumbs
