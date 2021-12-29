// ** React Imports
import { useState, useEffect } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X, Cpu, Layers, Command, Clipboard, Database } from 'react-feather'
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
  Label,
  FormFeedback
} from 'reactstrap'

import axios from 'axios'
import handleError from '@components/alerts/Error'
import handleSuccess from '@components/alerts/Success'
const AddNewModal = ({ open, handleModal, fetchData }) => {
  // ** State

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )

  const [data, setData] = useState([])
  const [datatwo, setDataTwo] = useState([])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const [cloudservicemetadataname, setcloudServiceMetadataName] = useState('')
  const [cloudresourcemetadatadescription, setcloudresourceMetadataDescription] = useState('')
  const [cloudresourcemetadataname, setcloudresourceMetadataName] = useState('')
  const [encstags, setencsTags] = useState('')

  //-------------Dropdown selection handler----------------
  const changeSelectcloudservicemetadataname = (event) => {
    setcloudServiceMetadataName(event.target.value)
  }
  //-------------Dropdown selection handler End----------------

  const handlePost = (evt) => {
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-cloud-resource-metadata-details`, {
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
        console.log("Response = ", response)
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
          const Notification_msg = "Added!"
          const Success_msg = response.data.message
          handleSuccess(Success_msg, Notification_msg, { fetchData })
        }
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error)
      })
  }

  //-----------------------------------Fetching Dropdown---------------------------------------------------------------

  //-----------------------------------Fetching Dropdown---------------------------------------------------------------

  useEffect(() => {
    // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-cloudResourceMetadataNames`

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

  // Validation Part Begins
  const SignupSchema = yup.object().shape({
    cloudservicemetadataname: yup.string().min(5).required(),
    cloudresourcemetadatadescription: yup.string().max(500).required(),
    cloudresourcemetadataname: yup.string().min(5).required(),
    Tags: yup.string().min(5).required()
  })

  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  // Validation Part Ends
  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title' style={{ color: 'black' }}>New Cloud Resourse Meta Data Details </h5>
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
            <Input type='select' name='cloudServiceMetadataName' id='cloudServiceMetadataName' onChange={changeSelectcloudservicemetadataname}>
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
              onChange={(e) => setencsTags(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <Button className='mr-1' color='primary' onClick={() => {
          handlePost()
          handleModal()
        }
        }>
          Submit
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal