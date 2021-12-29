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

  const handlePost = (evt) => {
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-onp-service-master-details`, {
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

  // Validation Part Begins
  const SignupSchema = yup.object().shape({
    onpServiceName: yup.string().min(5).required(),
    Description: yup.string().max(500).required(),
    encsOsTechMaster: yup.string().min(5).required(),
    encsDataTechMaster: yup.string().min(5).required(),
    encsAppTechMaster: yup.string().min(5).required(),
    Tags: yup.string().min(5).required()

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
        <h5 className='modal-title' style={{ color: 'black' }}>New ONP Service Master</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
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
              innerRef={register({ required: true })}
              invalid={errors.onpServiceName && true}
              onChange={(e) => setonpServiceName(e.target.value)} />
            {errors && errors.onpServiceName && <FormFeedback>ONP Service Name must be at least 5 characters</FormFeedback>}
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
              onChange={(e) => setonpServiceMasterDescription(e.target.value)} />
            {errors && errors.Description && <FormFeedback>Maximum 500 characters are allowed</FormFeedback>}
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
            <Input type='select' name='customerBusinessName' id='customerBusinessName' onChange={changeSelectOptionHandlerFgId}>
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
              innerRef={register({ required: true })}
              invalid={errors.encsOsTechMaster && true}
              onChange={(e) => setencsOsTechMaster(e.target.value)} />
            {errors && errors.encsOsTechMaster && <FormFeedback>OS Technology Master must be at least 5 characters</FormFeedback>}
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
              innerRef={register({ required: true })}
              invalid={errors.encsDataTechMaster && true}
              onChange={(e) => setencsDataTechMaster(e.target.value)} />
            {errors && errors.encsDataTechMaster && <FormFeedback>Data Technology Master must be at least 5 characters</FormFeedback>}
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
              innerRef={register({ required: true })}
              invalid={errors.encsAppTechMaster && true}
              onChange={(e) => setencsAppTechMaster(e.target.value)} />
            {errors && errors.encsAppTechMaster && <FormFeedback>Application Technology Master must be at least 5 characters</FormFeedback>}
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
              innerRef={register({ required: true })}
              invalid={errors.Tags && true}
              onChange={(e) => setencsTags(e.target.value)} />
            {errors && errors.Tags && <FormFeedback>Tags must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <Button className='mr-1' color='primary' onClick={(e) => {
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