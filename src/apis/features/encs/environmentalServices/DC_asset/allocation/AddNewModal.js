// ** React Imports
import { useState, useEffect } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Flatpickr from 'react-flatpickr'

// ** Third Party Components
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
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const AddNewModal = ({ open, handleModal, fetchData }) => {
  // ** State
  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  const [data, setData] = useState([])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const [allocOwnerGroup, setallocOwnerGroup] = useState("")
  const [requestType, setrequestType] = useState("")
  const [tNumber, settNumber] = useState()
  const [dcasset, setDcAsset] = useState('')
  const [dcassetid, setDcAssetId] = useState('')
  const [dates, setPicker] = useState(new Date())
  console.log("Dates = ", dates[0])
  const date =  new Intl.DateTimeFormat('en-iso8601').format(dates[0])
  console.log("Date converted = ", date)

  const index = data.findIndex(obj => obj.dcAssetName === dcasset)
  console.log("Index value = ", index)// Printing the index value of selected option
  useEffect(() => {
  try { //This try is solve the Type undifined error
    setDcAssetId(data[index].dcAssetId)
  } catch (error) {
    console.log('Spec', error)
  }
  })
  console.log(dcassetid)
   const changeSelectOptionHandlerCustomerBusinessName = (event) => {
    setDcAsset(event.target.value)
   }
  //-Dropdown selection handler End-
  const changeSelectrequestType = (event) => {
    setrequestType(event.target.value)
   }
  const handlePost = (evt) => {
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-dc-asset-allocation`, {
          assetAllocOwnerGroup : allocOwnerGroup,
          allocRequestType : requestType,
          allocatedDate : date,
          dcAssetId : dcassetid,
          ticketNunber : tNumber
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
        console.log("Well done!", response)
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
          const  Success_msg = response.data.message
          handleSuccess(Success_msg, Notification_msg, {fetchData})
        }
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error)
      })
  }

    //--Fetching Dropdown Api 1
  
    useEffect(() => { 
      // if (isLoaded === false) {
        axios.get(`${process.env.REACT_APP_URL}/api/v1/list-AssetNames`
        
      )
      .then((response) => {
        // Handle success.
        console.log("Connection established.Data is fetching from list!")
        setData(response.data.data)
        console.log(response.data.data)
        })
        .catch((error) => {
          console.error(error)
     })
    }, []) 
   //--Fetching Dropdown
  

  // Validation Part Begins
  const SignupSchema = yup.object().shape({
    ownerGruop: yup.string().min(5).required(),
    requestType: yup.string().min(5).required(),
   ticketNumber: yup.number().required().positive().integer()

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
        <h5 className='modal-title'style={{color:'black'}}>New DC Asset Allocation</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label for='Ostechname' style={{fontSize:'1rem'}}>DC Asset</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Dcasset' onChange={changeSelectOptionHandlerCustomerBusinessName}>
          <option disabled hidden selected> Dc Asset </option>
            {data.map(item => (
              <option
                key={data.dcAssetName}
                value={data.dcAssetName}
                
              >
                {item.dcAssetName}
              </option>
            ))}
        </Input>
        </InputGroup>
        </FormGroup>
      <FormGroup>
          <Label for='ownerGruop' style={{fontSize:'1rem'}}>Asset Allocation Owner Group</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='ownerGruop' name='ownerGruop' innerRef={register({ required: true })} invalid={errors.ownerGruop && true} placeholder='' onChange={(e) => setallocOwnerGroup(e.target.value)} />
            {errors && errors.ownerGruop && <FormFeedback>Asset Allocation Owner Group must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='requestType' style={{fontSize:'1rem'}}>Allocation Request Type</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Command size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='select' name='select' id='requestType' onChange={changeSelectrequestType}>
              <option disabled hidden selected>Allocation Request Type</option>
              <option>Manual</option>
              <option>Tickets</option>
              <option>Application</option>
            </Input>
        </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='ticketNumber' style={{fontSize:'1rem'}}>Ticket Number</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='ticketNumber' name='ticketNumber' innerRef={register({ required: true })} invalid={errors.ticketNumber && true} placeholder='' onChange={(e) => settNumber(e.target.value)} />
           {errors && errors.ticketNumber && <FormFeedback>{errors.ticketNumber.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Datepicker' style={{fontSize:'1rem'}}> Allocated Date </Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Calendar size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Flatpickr className='form-control'
            value={dates}
             onChange={(date) => setPicker(date)} id='Datepicker' />
           </InputGroup>
        </FormGroup>   
        <Button className='mr-1' color='primary' onClick={ () => {
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