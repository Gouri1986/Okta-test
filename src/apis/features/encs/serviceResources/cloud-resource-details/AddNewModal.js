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
  const [Picker, setPicker] = useState(new Date())

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )

  const [data, setData] = useState([])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
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

  const handlePost = (evt) => {

    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-cloud-resource-master`, {
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

  // Validation Part Begins
  const SignupSchema = yup.object().shape({
    cloudResourceName: yup.string().min(5).required(),
    cloudType: yup.string().min(5).required(),
    DependentServices: yup.string().min(5).required(),
    Description: yup.string().max(500).required(),
    Cloudresourcemetadataname: yup.string().max(500).required()
  })

  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const onSubmit = data => {
    console.log(data)
  }
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
        <h5 className='modal-title' style={{ color: 'black' }}>New Cloud Resource Master</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for='Cloudresourcename' style={{ fontSize: '1rem' }}>Cloud Resource Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Cloudresourcename'
              name='cloudResourceName'
              innerRef={register({ required: true })}
              invalid={errors.cloudResourceName && true}
              onChange={(e) => setcloudResourceName(e.target.value)} />
            {errors && errors.cloudResourceName && <FormFeedback>Cloud Resource Name must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Description' style={{ fontSize: '1rem' }}>Description</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Description'
              name='Description' type='textarea' rows='2'
              innerRef={register({ required: true })}
              invalid={errors.Description && true}
              onChange={(e) => setcloudResourceMasterDescription(e.target.value)} />
            {errors && errors.Description && <FormFeedback>Maximum 500 characters are allowed</FormFeedback>}
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
            <Input type='select' name='cloudmaster' id='cloudmaster' onChange={changeSelectOptionHandlerFgId}>
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
          <Label for='DependentServices' style={{ fontSize: '1rem' }}>Cloud Dependent Services</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='DependentServices'
              name='DependentServices'
              innerRef={register({ required: true })}
              invalid={errors.DependentServices && true}
              onChange={(e) => setcloudDependentServices(e.target.value)} />
            {errors && errors.DependentServices && <FormFeedback>Cloud Dependent Services must be at least 5 characters</FormFeedback>}
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
              innerRef={register({ required: true })}
              invalid={errors.Cloudresourcemetadataname && true}
              onChange={(e) => setcloudresourcemetadataname(e.target.value)} />
            {errors && errors.Cloudresourcemetadataname && <FormFeedback>cloud Resource Metadata Name must be at least 5 characters</FormFeedback>}
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
              innerRef={register({ required: true })}
              invalid={errors.cloudServiceMetadataName && true}
              onChange={(e) => setcloudservicemetadataname(e.target.value)} />
            {errors && errors.cloudServiceMetadataName && <FormFeedback>cloud Service Metadata Name must be at least 5 characters</FormFeedback>}
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