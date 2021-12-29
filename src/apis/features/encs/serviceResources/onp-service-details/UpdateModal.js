// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Database, Mail, Calendar, DollarSign, X, Cpu, Layers, Command } from 'react-feather'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label
} from 'reactstrap'

import axios from 'axios'
import handleError from '@components/alerts/Error'
import handleSuccess from '@components/alerts/Success'
const UpdateModal = ({ open, handleUpdateModal, value, fetchData }) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())
  const [data, setData] = useState([])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [onpservicemasterid, setonpServiceMasterId] = useState("")
  const [customerid, setcustomerId] = useState("")
  const [customername, setcustomerName] = useState("")
  const [encsapptechmaster, setencsAppTechMaster] = useState("")
  const [encsdatatechmaster, setencsDataTechMaster] = useState("")
  const [encsostechmaster, setencsOsTechMaster] = useState("")
  const [encstags, setencsTags] = useState("")
  const [onpservicemasterdescription, setonpServiceMasterDescription] = useState("")
  const [onpservicename, setonpServiceName] = useState("")
  const [onpservicetype, setonpServiceType] = useState("")
  const [onptechnologytype, setonpTechnologyType] = useState("")

  const index = data.findIndex(obj => obj.customerBusinessName === customername)
  console.log("Index value = ", index)// Printing the index value of selected option

  useEffect(() => {
    try { //This try is solve the Type undifined error
      setcustomerId(data[index].customerId)
    } catch (error) {
      console.log('Spec', error)
    }
  })
  console.log(customerid)

  //-------------Fg Id Dropdown selection handler----------------

  const changeSelectOptionHandlerFgId = (event) => {
    setcustomerName(event.target.value)
  }
  //-------------Dropdown selection handler End----------------

  useEffect(() => {
    setonpServiceMasterId(value.onpServiceMasterId)
  })
  useEffect(() => {
    setcustomerId(value.customerId)
    setcustomerName(value.customerName)
    setencsAppTechMaster(value.encsAppTechMaster)
    setencsDataTechMaster(value.encsDataTechMaster)
    setencsOsTechMaster(value.encsOsTechMaster)
    setencsTags(value.encsTags)
    setonpServiceMasterDescription(value.onpServiceMasterDescription)
    setonpServiceName(value.onpServiceName)
    setonpServiceType(value.onpServiceType)
    setonpTechnologyType(value.onpTechnologyType)
  }, [value])

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )


  const handlePost = (evt) => {

    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-onp-service-master-details`, {
      onpServiceMasterId: onpservicemasterid,
      customerId: customerid,
      customerName: customername,
      encsAppTechMaster: encsapptechmaster,
      encsDataTechMaster: encsdatatechmaster,
      encsOsTechMaster: encsostechmaster,
      encsTags: encstags,
      onpServiceMasterDescription: onpservicemasterdescription,
      onpServiceName: onpservicename,
      onpServiceType: onpservicetype,
      onpTechnologyType: onptechnologytype
    },
      {
        headers: {
          "Content-Type": "application/json",
          "access-token": `${token}`
        }
      }
    )
      .then((response) => {
        // Handle success.
        console.log("Well done!")
        if (response.data.message === "You are trying to insert duplicate records") {
          const msg = response.data.message
          console.log(msg)
          handleError(msg)
        } else if (response.data.message === "An unexpected internal application error has occurred. Please Contact System Administrator") {
          const msg = response.data.message
          console.log(msg)
          handleError(msg)
        } else if (response.data.message === "Parent key not found") {
          const msg = response.data.message
          console.log(msg)
          handleError(msg)
        } else {
          const Notification_msg = "Updated!"
          const Success_msg = response.data.message
          handleSuccess(Success_msg, Notification_msg, { fetchData })
        }
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error)
      })
  }
  //-------------------------Update Method End---------------------------------------------
  //-----------------------------------Fetching Dropdown---------------------------------------------------------------
  useEffect(() => {
    // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-customer`

    )
      .then((response) => {
        // Handle success.
        console.log("Connection established.Data is fetching!")
        // const options = data.map(d => ({
        //   value : d.id,
        //   label : d.name
        // }))
        //  setIsLoaded(true)
        setData(response.data.data)
        console.log(response.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  //-----------------------------------------Fetching Dropdown ends------------------------------------------------------------

  return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title' style={{ color: 'black' }}>Update ONP Service Master</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <FormGroup>
          <Label for='onpServiceName' style={{ fontSize: '1rem' }}>ONP Service Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='onpServiceName'
              name='onpServiceName'
              value={onpservicename}
              onChange={(e) => setonpServiceName(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='description' style={{ fontSize: '1rem' }}>Description</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='description'
              name='description'
              value={onpservicemasterdescription}
              onChange={(e) => setonpServiceMasterDescription(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='customerBusinessName' style={{ fontSize: '1rem' }}>Customer Business Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Layers size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='select' name='customerBusinessName' id='customerBusinessName'
              value={customername}
              onChange={changeSelectOptionHandlerFgId}>
              <option selected disabled hidden>Customer Business Name</option>
              {data.map(item => (
                <option
                  key={data.customerBusinessName}
                  value={data.customerBusinessName}
                >
                  {item.customerBusinessName}
                </option>
              ))}
            </Input>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='onpServiceType' style={{ fontSize: '1rem' }}>ONP Service Type</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='onpServiceType'
              name='onpServiceType'
              type='select'
              value={onpservicetype}
              onChange={(e) => setonpServiceType(e.target.value)}>
              <option>LaaS</option>
              <option>PaaS</option>
              <option>SaaS</option>
            </Input>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='onpTechnologyType' style={{ fontSize: '1rem' }}>ONP Technology Type</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='onpTechnologyType'
              name='onpTechnologyType'
              type='select'
              value={onptechnologytype}
              onChange={(e) => setonpTechnologyType(e.target.value)}>
              <option>Os</option>
              <option>Data</option>
              <option>Technology</option>
            </Input>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='encsOsTechMaster' style={{ fontSize: '1rem' }}>OS Technology Master</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='encsOsTechMaster'
              name='encsOsTechMaster'
              value={encsostechmaster}
              onChange={(e) => setencsOsTechMaster(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='encsDataTechMaster' style={{ fontSize: '1rem' }}>Data Technology Master</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='encsDataTechMaster'
              name='encsDataTechMaster'
              value={encsdatatechmaster}
              onChange={(e) => setencsDataTechMaster(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='encsAppTechMaster' style={{ fontSize: '1rem' }}>Application Technology Master</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='encsAppTechMaster'
              name='encsAppTechMaster'
              value={encsapptechmaster}
              onChange={(e) => setencsAppTechMaster(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='encsTags' style={{ fontSize: '1rem' }}>Tags</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='encsTags'
              name='encsTags'
              value={encstags}
              onChange={(e) => setencsTags(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <Button className='mr-1' color='primary'
          onClick={(e) => {
            handlePost()
            handleUpdateModal()
          }}>
          Submit
        </Button>
        <Button color='secondary' onClick={handleUpdateModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default UpdateModal
