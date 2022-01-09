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
  const [data, setData] = useState([])

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [cloudservicemasterdescription, setcloudServiceMasterDescription] = useState('')
  const [cloudservicename, setcloudServiceName] = useState('')
  const [cloudservicetype, setcloudServiceType] = useState('')
  const [encstags, setencsTags] = useState('')

  useEffect(() => {
    setcloudServiceMasterDescription(value.cloudServiceMetadataDescription)
    setcloudServiceName(value.cloudServiceMetadataName)
    setcloudServiceType(value.cloudServiceType)
    setencsTags(value.encsTags)
  }, [value])

  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-cloud-service-metadata-details`, {
      cloudServiceMetadataDescription: cloudservicemasterdescription,
      cloudServiceMetadataName: cloudservicename,
      cloudServiceType: cloudservicetype,
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

  return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title' style={{ color: 'black' }}>Update Cloud Service Meta Data Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <FormGroup>
          <Label for='cloudServiceMetadataName' style={{ fontSize: '1rem' }}>Cloud Service Metadata Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Layers size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              name='cloudServiceMetadataName'
              id='cloudServiceMetadataName'
              value={cloudservicename}
              onChange={(e) => setcloudServiceName(e.target.value)}
            />
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
