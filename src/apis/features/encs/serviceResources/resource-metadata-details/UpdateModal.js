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
  const [datatwo, setDataTwo] = useState([])

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [cloudservicemetadataname, setcloudServiceMetadataName] = useState('')
  const [cloudresourcemetadatadescription, setcloudresourceMetadataDescription] = useState('')
  const [cloudresourcemetadataname, setcloudresourceMetadataName] = useState('')
  const [encstags, setencsTags] = useState('')

  useEffect(() => {
    setcloudServiceMetadataName(value.cloudServiceMetadataName)
    setcloudresourceMetadataDescription(value.cloudResourceMetadataDescription)
    setcloudresourceMetadataName(value.cloudResourceMetadataName)
    setencsTags(value.encsTags)
  }, [value])

  //-------------Dropdown selection handler----------------
  const changeSelectcloudservicemetadataname = (event) => {
    setcloudServiceMetadataName(event.target.value)
  }
  //-------------Dropdown selection handler End----------------

  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-cloud-resource-metadata-details`, {
      cloudServiceMetadataName: cloudservicemetadataname,
      cloudResourceMetadataDescription: cloudresourcemetadatadescription,
      cloudResourceMetadataName: cloudresourcemetadataname,
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
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-cloudServiceMetadataNames`

    )
      .then((response) => {
        // Handle success.
        console.log("Connection established.Data is fetching!")
        setDataTwo(response.data.data)
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
      <ModalBody className='flex-grow-1' >
        <FormGroup>
          <Label for='cloudResourceMetadataName' style={{ fontSize: '1rem' }}>Cloud Resource Metadata Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Layers size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='cloudservicemetadataname'
              name='cloudservicemetadataname'
              value={cloudresourcemetadataname}
              onChange={(e) => setcloudresourceMetadataName(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Tags' style={{ fontSize: '1rem' }}>Description</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='cloudservicemetadataname'
              name='cloudservicemetadataname'
              value={cloudresourcemetadatadescription}
              onChange={(e) => setcloudresourceMetadataDescription(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='cloudServiceMetadataName' style={{ fontSize: '1rem' }}>Cloud Service Metadata Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Layers size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='select'
              name='cloudServiceMetadataName'
              id='cloudServiceMetadataName'
              value={cloudservicemetadataname}
              onChange={changeSelectcloudservicemetadataname}>
              <option selected disabled hidden>Cloud Service Metadata Name</option>
              {datatwo.map(item => (
                <option
                  key={datatwo.cloudServiceMetadataName}
                  value={datatwo.cloudServiceMetadataName}
                >
                  {item.cloudServiceMetadataName}
                </option>
              ))}
            </Input>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Tags' style={{ fontSize: '1rem' }}>Tags</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Tags'
              name='Tags'
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
