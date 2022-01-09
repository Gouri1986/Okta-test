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

const UpdateModal = ({ open, handleUpdateModal, value, fetchData}) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())
  const [data, setData] = useState([])
  const [datathree, setDataThree] = useState([])
  const [datatwo, setDataTwo] = useState([])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [dchallname, setDchallName] = useState('')
  const [dchallid, setDchallid] = useState('')
  const [customerbusinessname, setCustomerBusinessName] = useState('')
  const [customerbusinessid, setCustomerBusinessId] = useState('')
  const [partitionname, setpartitionName] = useState("")
  const [pk, setPk] = useState("")

 //-Dropdown selection handler-
 const index = data.findIndex(obj => obj.dcHallName === dchallname)
 console.log("Index value Business= ", index)

 useEffect(() => {
   try { //This try is solve the Type undifined error
    setDchallid(data[index].dcHallId)
   } catch (error) {
     console.log('Spec', error)
   }
 })
 console.log('dcHallId =', dchallid)

 const changeSelectOptionHandlerDcHallName = (event) => {
  setDchallName(event.target.value)
 }
//-Dropdown selection handler End-

//-Dropdown selection handler-
 
const index2 = datatwo.findIndex(obj => obj.customerBusinessName === customerbusinessname)
console.log("Index value Business= ", index2)
 
useEffect(() => {
  try { //This try is solve the Type undifined error
    setCustomerBusinessId(datatwo[index2].customerId)
     } catch (error) {
       console.log('Spec', error)
     }
   })
  console.log('customerId =', customerbusinessid)

  const changeSelectOptionHandlerCustomerBusinessName = (event) => {
  setCustomerBusinessName(event.target.value)
   }
//-Dropdown selection handler End-

//-Dropdown selection handler-
  
  const changeSelectOptionHandlerResourcePartitionName = (event) => {
    setpartitionName(event.target.value)
   }
//-Dropdown selection handler End-

  //-Update Method
  useEffect(() => {
   })
  useEffect(() => {
    setDchallName(value.dcHallName)
    setCustomerBusinessName(value.customerBusinessName)
    setpartitionName(value.resPartitionName)
    setPk(value.resPartitionDcHallId)
 }, [value])

// dummy Token 
const [token, setToken] = useState(
  localStorage.getItem('token') || ''
)
  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-res-partition-dc-hall`, {
      customerBusinessName : customerbusinessname,
      customerId : customerbusinessid,
      dcHallId : dchallid,
      dcHallName : dchallname,
      resPartitionDcHallId : pk,
      resPartitionName : partitionname 
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
          const Notification_msg = "Updated!"
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
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-dcHallNames`
    
  )
  .then((response) => {
    // Handle success.
    console.log("Connection established.Data is fetching from dc name!")
    setData(response.data.data)
    console.log(response.data.data)
    })
    .catch((error) => {
      console.error(error)
 })
}, [])

//--Fetching Dropdown Api 1

useEffect(() => { 
  // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-customer`
    
  )
  .then((response) => {
    // Handle success.
    console.log("Connection established.Data is fetching from list!")
    setDataTwo(response.data.data)
    console.log(response.data.data)
    })
    .catch((error) => {
      console.error(error)
 })
}, [])

//--Fetching Dropdown Api 1

useEffect(() => { 
  // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-resPartitionNames`
    
  )
  .then((response) => {
    // Handle success.
    console.log("Connection established.Data is fetching from list!")
    setDataThree(response.data.data)
    console.log(response.data.data)
    })
    .catch((error) => {
      console.error(error)
 })
}, [])
return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>Update Resource Partition DC Hall</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
       {/* <FormGroup>
          <Label for='isctechcategorydescription' style={{fontSize:'1rem'}}> Resource Partition Dc Hall</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='isctechcategorydescription'
            onChange={(e) => setResourcePartitionDCHall(e.target.value)} />
          </InputGroup>
       </FormGroup> */}
      <FormGroup>
        <Label for='Customer' style={{fontSize:'1rem'}}>Customer</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Customer' 
          value={customerbusinessname}
          onChange={changeSelectOptionHandlerCustomerBusinessName}>
            <option disabled hidden selected> Choose Business Name </option>
            {datatwo.map(item => (
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
        <Label for='ResourcePartitionName' style={{fontSize:'1rem'}}>Resource Partition Name</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='ResourcePartitionName'
          value={partitionname}
          onChange={changeSelectOptionHandlerResourcePartitionName}>
          <option disabled hidden selected> Choose Resource Partition Name </option>
            {datathree.map(item => (
              <option
                key={data.resPartitionName}
                value={data.resPartitionName}
                
              >
                {item.resPartitionName}
              </option>
            ))}
        </Input>
        </InputGroup>
        </FormGroup>

        <FormGroup>
        <Label for='DCHallName' style={{fontSize:'1rem'}}>DC Hall Name</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='DCHallName' 
          value={dchallname}
          onChange={changeSelectOptionHandlerDcHallName}>
          <option disabled hidden selected> Choose DC Hall Name </option>
            {data.map(item => (
              <option
                key={data.dcHallName}
                value={data.dcHallName}
                
              >
                {item.dcHallName}
              </option>
            ))}
        </Input>
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
