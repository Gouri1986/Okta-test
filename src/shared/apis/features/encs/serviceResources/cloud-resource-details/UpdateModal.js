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
  const [cloudresourcemasterid, setcloudresourcemasterid] = useState("")
  const [cloudservicename, setcloudservicename] = useState("")
  const [cloudserivcemasterid, setcloudSerivceMasterId] = useState("")
  const [cloudresourcename, setcloudResourceName] = useState("")
  const [clouddependentservices, setcloudDependentServices] = useState("")
  const [cloudresourcemasterdescription, setcloudResourceMasterDescription] = useState("")
  const [encstags, setencsTags] = useState("")
  const [cloudresourcemetadataname, setcloudresourcemetadataname] = useState("")
  const [cloudservicemetadataname, setcloudservicemetadataname] = useState("")

  const index = data.findIndex(obj => obj.cloudServiceName === cloudservicename)
  console.log("Index value = ", index)// Printing the index value of selected option

  useEffect(() => {
    try { //This try is solve the Type undifined error
      setcloudSerivceMasterId(data[index].cloudSerivceMasterId)
      //console.log("Direct = ", data[index].customerId)
    } catch (error) {
      console.log('Spec', error)
    }
  })
  console.log(cloudserivcemasterid)

  //-------------Fg Id Dropdown selection handler----------------

  const changeSelectOptionHandlerFgId = (event) => {
    setcloudservicename(event.target.value)
  }
  //-------------Dropdown selection handler End----------------
  useEffect(() => {
    setcloudresourcemasterid(value.cloudResourceMasterId)
  })
  useEffect(() => {
    setcloudservicename(value.cloudServiceName)
    setcloudSerivceMasterId(value.cloudServiceMasterId)
    setcloudResourceName(value.cloudResourceName)
    setcloudDependentServices(value.cloudDependentServices)
    setcloudResourceMasterDescription(value.cloudResourceMasterDescription)
    setencsTags(value.encsTags)
    setcloudresourcemetadataname(value.cloudResourceMetadataName)
    setcloudservicemetadataname(value.cloudServiceMetadataName)
  }, [value])

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )


  const handlePost = (evt) => {

    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-cloud-resource-master`, {
      cloudResourceMasterId: cloudresourcemasterid,
      cloudDependentServices: clouddependentservices,
      cloudResourceMasterDescription: cloudresourcemasterdescription,
      cloudResourceName: cloudresourcename,
      cloudServiceMasterId: cloudserivcemasterid,
      cloudServiceName: cloudservicename,
      encsTags: encstags,
      cloudResourceMetadataName: cloudresourcemetadataname,
      cloudServiceMetadataName: cloudservicemetadataname
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
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-cloudServiceNames`

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
        <h5 className='modal-title' style={{ color: 'black' }}>Update Cloud Resource Master</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <FormGroup>
          <Label for='Cloudresourcename' style={{ fontSize: '1rem' }}>Cloud Resource Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Cloudresourcename'
              name='name'
              value={cloudresourcename}
              onChange={(e) => setcloudResourceName(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='cloudResourceMasterDescription' style={{ fontSize: '1rem' }}>Description</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='cloudResourceMasterDescription'
              name='name'
              value={cloudresourcemasterdescription}
              onChange={(e) => setcloudResourceMasterDescription(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='cloudmaster' style={{ fontSize: '1rem' }}>Cloud Service Master</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Layers size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='select' name='cloudmaster' id='cloudmaster'
              value={cloudservicename}
              onChange={changeSelectOptionHandlerFgId}>
              <option>Cloud Service Master</option>
              {data.map(item => (
                <option
                  key={data.cloudServiceName}
                  value={data.cloudServiceName}
                >
                  {item.cloudServiceName}
                </option>
              ))}
            </Input>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='name' style={{ fontSize: '1rem' }}>Cloud Dependent Services</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='name'
              name='name'
              value={clouddependentservices}
              onChange={(e) => setcloudDependentServices(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='name' style={{ fontSize: '1rem' }}>Tags</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='name'
              name='name'
              value={encstags}
              onChange={(e) => setencsTags(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Tags' style={{ fontSize: '1rem' }}>cloud Resource Metadata Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Tags'
              name='Tags'
              value={cloudresourcemetadataname}
              onChange={(e) => setcloudresourcemetadataname(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Tags' style={{ fontSize: '1rem' }}>Cloud Service Metadata Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Tags'
              name='Tags'
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
