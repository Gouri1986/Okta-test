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
  const [cloudservicegroup, setcloudServiceGroup] = useState('')
  const [cloudservicemasterdescription, setcloudServiceMasterDescription] = useState('')
  const [cloudservicename, setcloudServiceName] = useState('')
  const [cloudservicetype, setcloudServiceType] = useState('')
  const [cloudtype, setcloudType] = useState('')
  const [encstags, setencsTags] = useState('')
  const [cloudid, setCloudId] = useState('')
  const [cloudname, setcloudName] = useState('')
  const [cloudserivcemasterid, setcloudSerivceMasterId] = useState('')
  const [cloudservicemetadataname, setcloudservicemetadataname] = useState('')

  const index = data.findIndex(obj => obj.cloudName === cloudname)
  console.log("Index value = ", index)// Printing the index value of selected option

  useEffect(() => {
    try { //This try is solve the Type undifined error
      setCloudId(data[index].cloudMasterId)
      //console.log("Direct = ", data[index].customerId)
    } catch (error) {
      console.log('Spec', error)
    }
  })
  console.log(cloudid)

  //-------------Fg Id Dropdown selection handler----------------

  const changeSelectOptionHandlercloudMasterId = (event) => {
    setcloudName(event.target.value)
  }
  //-------------Dropdown selection handler End----------------

  useEffect(() => {

  })
  useEffect(() => {
    setcloudServiceGroup(value.cloudServiceGroup)
    setcloudServiceMasterDescription(value.cloudServiceMasterDescription)
    setcloudServiceName(value.cloudServiceName)
    setcloudServiceType(value.cloudServiceType)
    setcloudType(value.cloudType)
    setencsTags(value.encsTags)
    setcloudName(value.cloudName)
    setcloudSerivceMasterId(value.cloudSerivceMasterId)
    setcloudservicemetadataname(value.cloudServiceMetadataName)
  }, [value])

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )


  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-cloud-service-master`, {
      cloudSerivceMasterId: cloudserivcemasterid,
      cloudId: cloudid,
      cloudName: cloudname,
      cloudServiceGroup: cloudservicegroup,
      cloudServiceMasterDescription: cloudservicemasterdescription,
      cloudServiceMetadataName: cloudservicemetadataname,
      cloudServiceName: cloudservicename,
      cloudServiceType: cloudservicetype,
      cloudType: cloudtype,
      encsTags: encstags
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
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-cloudNames`

    )
      .then((response) => {
        // Handle success.
        console.log("Connection established.Data is fetching!")
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
        <h5 className='modal-title' style={{ color: 'black' }}>Update Cloud Service Master</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <FormGroup>
          <Label for='cloudServiceName' style={{ fontSize: '1rem' }}>Cloud Service Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='cloudServiceName'
              name='name'
              value={cloudservicename}
              onChange={(e) => setcloudServiceName(e.target.value)} />
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
              value={cloudservicemasterdescription}
              onChange={(e) => setcloudServiceMasterDescription(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='cloudservicetype' style={{ fontSize: '1rem' }}>Cloud Service Type</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='cloudservicetype'
              name='cloudservicetype'
              type='select'
              value={cloudservicetype}
              onChange={(e) => setcloudServiceType(e.target.value)}>
              <option>IaaS</option>
              <option>PaaS</option>
              <option>SaaS</option>
            </Input>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='cloudType' style={{ fontSize: '1rem' }}>Cloud Type</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='cloudType'
              name='cloudType'
              type='select'
              value={cloudtype}
              onChange={(e) => setcloudType(e.target.value)}>
              <option>Public</option>
              <option>Private</option>
            </Input>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='cloudName' style={{ fontSize: '1rem' }}>Cloud Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Layers size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='select' name='cloudName'
              value={cloudname}
              id='cloudName' onChange={changeSelectOptionHandlercloudMasterId}>
              <option selected disabled hidden> Choose Cloud Name</option>
              {data.map(item => (
                <option
                  key={data.cloudName}
                  value={data.cloudName}
                >
                  {item.cloudName}
                </option>
              ))}
            </Input>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='cloudServiceGroup' style={{ fontSize: '1rem' }}>Cloud Service Group</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='cloudServiceGroup'
              name='cloudServiceGroup'
              value={cloudservicegroup}
              onChange={(e) => setcloudServiceGroup(e.target.value)} />
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
        <FormGroup>
          <Label for='encsTags' style={{ fontSize: '1rem' }}>Cloud Service Metadata Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='cloudservicemetadataname'
              name='cloudservicemetadataname'
              value={cloudservicemetadataname}
              onChange={(e) => setcloudservicemetadataname(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <Button className='mr-1' color='primary'
          onClick={() => {
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
