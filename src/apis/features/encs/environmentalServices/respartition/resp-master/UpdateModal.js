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

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [partitionName, setPartitionName] = useState("")
  const [partitionDescription, setPartitionDescription] = useState("")
  const [customerbusinessname, setcustomerBusinessName] = useState("")
  const [customerid, setcustomerId] = useState("")
  
  const index2 = data.findIndex(obj => obj.customerId === customerid)
  console.log("Index value customerid = ", index2)// Printing the index value of selected option

  useEffect(() => {
    try { //This try is solve the Type undifined error
      setcustomerBusinessName(data[index2].customerBusinessName)
      //console.log("Direct = ", data[index].customerId)
    } catch (error) {
      console.log('Spec', error)
    }
  })

  const index = data.findIndex(obj => obj.customerBusinessName === customerbusinessname)
  console.log("Index value = ", index)// Printing the index value of selected option

  useEffect(() => {
    try { //This try is solve the Type undifined error
      setcustomerId(data[index].customerId)
      //console.log("Direct = ", data[index].customerId)
    } catch (error) {
      console.log('Spec', error)
    }
  })

  const changeSelectOptionHandlerCustomer = (event) => {
    setcustomerBusinessName(event.target.value)
  }
  //-Update Method
  useEffect(() => {
   })
  useEffect(() => {
    setcustomerId(value.customerId)
    setPartitionName(value.resPartitionName)
    setPartitionDescription(value.resPartitionDescription)
 }, [value])
 
// dummy Token 
const [token, setToken] = useState(
  localStorage.getItem('token') || ''
)
  const handlePost = (evt) => { 
    
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-res-partition-master`, { 
          resPartitionName : partitionName,
          customerId : customerid,
          resPartitionDescription : partitionDescription
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

//--Fetching Dropdown

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
return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>Update Resource Partition </h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
    <FormGroup>
        <Label for='fgid' style={{fontSize:'1rem'}}>Customer</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='fgid' id='fgid-basic' 
          value={customerbusinessname}
          onChange={changeSelectOptionHandlerCustomer}>
            <option disabled hidden selected> Choose functional group id </option>
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
          <Label for='Resource-Partition' style={{fontSize:'1rem'}}>Resource Partition</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Resource-Partition'
            value={partitionName}
            onChange={(e) => setPartitionName(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Description' style={{fontSize:'1rem'}}>Discription</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Description'
            value={partitionDescription}
            onChange={(e) => setPartitionDescription(e.target.value)} />
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
