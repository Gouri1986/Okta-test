import React from "react"
import { Breadcrumbs, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

import "./BreadCumbs.scss"

const BreadCumbs = props => {
  const { titleData } = props

  return (
    <div>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {titleData?.map((item, i) =>
          item?.type === "Parent" ? (
            <Typography key={i} color="text.primary">
              <Link to={item?.link}>{item?.title}</Link>
            </Typography>
          ) : item?.type === "Child" ? (
            <Typography key={i} color="text.primary">
              {item?.title}
            </Typography>
          ) : (
            ""
          )
        )}
      </Breadcrumbs>
    </div>
  )
}

export default BreadCumbs
