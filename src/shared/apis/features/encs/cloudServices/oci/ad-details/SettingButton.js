import Switch from "@material-ui/core/Switch"
import { Settings } from "react-feather"
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  Row,
  Col
} from "reactstrap"

const SettingButton = (props) => {
  return (
    <UncontrolledButtonDropdown className="settingMenu">
      <DropdownToggle color="primary" size="lg" className="btn-icon btn-round ">
        <Settings size={16} />
        {
          (props.caseaddress2 || props.caseaddress3 || props.casesecondaryphone || props.casesecondaryemail) ? <span 
          style={{
          borderRadius:'50%',
          height:'10px',
          width:'10px',
          position: "absolute",
          backgroundColor: '#ea5455',
          marginTop:'-17px',
          marginLeft:'7px'
          }}
         ></span> : null
        }
      </DropdownToggle>
      <DropdownMenu tag="ul" right>
        <div className="mb-1" style={{ width: 400 }}>
          <h4 className="pt-1 pl-2 ">Colomn Preferences</h4>
          <Row className="pt-2 pl-2">
            <Col>
              <h5>Address 2</h5>
            </Col>
            <Col>
              <div className="pl-5">
                <Switch
                  color="primary"
                  checked={props.caseaddress2}
                  onClick={props.stateaddress2}
                />
              </div>
            </Col>
          </Row>
          <Row className="pt-2 pl-2">
            <Col>
              <h5>Address 3</h5>
            </Col>
            <Col>
              <div className="pl-5">
                <Switch 
                color="primary"
                checked={props.caseaddress3}
                onClick={props.stateaddress3}
                />
              </div>
            </Col>
          </Row>
          <Row className="pt-2 pl-2">
            <Col>
              <h5>Secondary Phone</h5>
            </Col>
            <Col>
              <div className="pl-5">
                <Switch color="primary"
                checked={props.casesecondaryphone}
                onClick={props.statesecondaryphone}
                 />
              </div>
            </Col>
          </Row>
          <Row className="pt-2 pl-2">
            <Col>
              <h5>Secondary Email</h5>
            </Col>
            <Col>
              <div className="pl-5">
              <Switch color="primary"
                checked={props.casesecondaryemail}
                onClick={props.statesecondaryemail}
                 />
              </div>
            </Col>
          </Row>
          {/* <Row className="pt-2 pl-2">
            <Col>
              <h5>Created</h5>
            </Col>
            <Col>
              <div className="pl-5">
                <Switch color="primary" />
              </div>
            </Col>
          </Row> */}
        </div>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  )
}

export default SettingButton
