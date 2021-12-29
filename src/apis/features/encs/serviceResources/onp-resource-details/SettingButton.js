import { Fragment, useState, useEffect, forwardRef } from "react"

import Switch from "@material-ui/core/Switch"
// ** Third Party Components
import ReactPaginate from "react-paginate"
import DataTable from "react-data-table-component"
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
  Plus,
  MoreVertical,
  Archive,
  Trash,
  Settings,
  Edit
} from "react-feather"
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledDropdown,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row,
  Col
} from "reactstrap"

const SettingButton = ({ }) => {
  return (
    <UncontrolledButtonDropdown className="settingMenu">
      <DropdownToggle color="primary" size="lg" className="btn-icon btn-round ">
        <Settings size={16} />
      </DropdownToggle>
      <DropdownMenu tag="ul" right>
        <div className="" style={{ width: 400 }}>
          <h4 className="pt-1 pl-2 ">Preferences</h4>
          <Row className="pt-2 pl-2">
            <Col>
              <h5>Modified Recent Execution</h5>
            </Col>
            <Col>
              <div className="pl-5">
                <Switch
                  color="primary"
                  name="checkedA"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
            </Col>
          </Row>
          <Row className="pt-2 pl-2">
            <Col>
              <h5>Last Source Revision</h5>
            </Col>
            <Col>
              <div className="pl-5">
                <Switch color="primary" />
              </div>
            </Col>
          </Row>
          <Row className="pt-2 pl-2">
            <Col>
              <h5>Last Executed</h5>
            </Col>
            <Col>
              <div className="pl-5">
                <Switch color="primary" />
              </div>
            </Col>
          </Row>
          <Row className="pt-2 pl-2">
            <Col>
              <h5>Last Modified</h5>
            </Col>
            <Col>
              <div className="pl-5">
                <Switch color="primary" />
              </div>
            </Col>
          </Row>
          <Row className="pt-2 pl-2">
            <Col>
              <h5>Created</h5>
            </Col>
            <Col>
              <div className="pl-5">
                <Switch color="primary" />
              </div>
            </Col>
          </Row>
        </div>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  )
}

export default SettingButton
