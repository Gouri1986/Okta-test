// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Tables
import TableWithButtons from './TableWithButtons'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Tables = () => {
  return (
    <Fragment>
      {/* <Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Basic' /> */}
      <TableWithButtons />
    </Fragment>
  )
}

export default Tables
