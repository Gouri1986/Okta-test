// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X, Cpu, Layers, Command } from 'react-feather'
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
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const UpdateModal = ({ open, handleUpdateModal, value, fetchData}) => {
  // ** State
  const [data, setData] = useState([])
  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  ) 
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [allocOwnerGroup, setallocOwnerGroup] = useState("")
  const [requestType, setrequestType] = useState("")
  const [assetId, setassetId] = useState("")
  const [tNumber, settNumber] = useState("")
  const [dcasset, setDcAsset] = useState('')
  const [dcassetid, setDcAssetId] = useState('')

  const [dates, setPicker] = useState(new Date())
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
  
  const changeSelectOptionHandlerDcAsset = (event) => {
    setDcAsset(event.target.value)
   }
   const changeSelectrequestType = (event) => {
    setrequestType(event.target.value)
   }
  const [updatedate, setupdatedate] = useState('')
 console.log("Update date  = ", updatedate)
  useEffect(() => {
    setallocOwnerGroup(value.assetAllocOwnerGroup)
    setrequestType(value.allocRequestType)
    setassetId(value.dcAssetId)
    setDcAsset(value.dcAssetName)
    settNumber(value.ticketNunber)
    setupdatedate(value.allocatedDate)
 }, [value])

//-Dropdown selection handler End-
  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-dc-asset-allocation`, {
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
          const Notification_msg = "Update!"
          const  Success_msg = response.data.message
          handleSuccess(Success_msg, Notification_msg, {fetchData})
        }
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error)
      })
  }
//-Update Method End
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


return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>Update DC Asset Allocation</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <FormGroup>
        <Label for='Ostechname' style={{fontSize:'1rem'}}>DC Asset</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Dcasset'
          value={dcasset}
          onChange={changeSelectOptionHandlerDcAsset}>
          <option disabled hidden selected> Choose DC Asset </option>
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
          <Label for='isctechcategorydescription' style={{fontSize:'1rem'}}>Asset Allocation Owner Group</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='ownergroup'
            value={allocOwnerGroup}
            onChange={(e) => setallocOwnerGroup(e.target.value)} />
          </InputGroup>
        </FormGroup>
      <FormGroup>
          <Label for='isctechcategoryname' style={{fontSize:'1rem'}}>Allocation Request Type</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='select' name='select' id='requestType' 
            value={requestType}
            onChange={changeSelectrequestType}>
              <option disabled hidden selected>Allocation Request Type</option>
              <option>Manual</option>
              <option>Tickets</option>
              <option>Application</option>
            </Input>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='isctechcategorytags' style={{fontSize:'1rem'}}>Ticket Number</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='ticketnumber'
            value={tNumber}
            onChange={(e) => settNumber(e.target.value)} />
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
             value={updatedate} 
             onChange={date => setPicker(date)} id='Datepicker' />
           </InputGroup>
        </FormGroup>  

        <Button className='mr-1' color='primary' 
        onClick={ () => {
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
