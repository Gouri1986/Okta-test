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

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  const [data, setData] = useState([])
  const [datatwo, setDataTwo] = useState([])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [apppartitiondescription, setappPartitionDescription] = useState("")
  const [apppartitionname, setappPartitionName] = useState("")
  const [envname, setEnvName] = useState('')
  const [pk, setPk] = useState('')
  const [applicationname, setApplicationName] = useState('')
  const [applicationid, setapplicationId] = useState('')
 
  useEffect(() => {
    setPk(value.appPartitionId)
   })
  useEffect(() => {
    setappPartitionDescription(value.appPartitionDescription)
    setappPartitionName(value.appPartitionName)
    setEnvName(value.appEnvName)
    setApplicationName(value.applicationName)
    setapplicationId(value.applicationId)
 }, [value])

  const index = data.findIndex(obj => obj.applicationName === applicationname)
  console.log("Index value = ", index)// Printing the index value of selected option
 
    useEffect(() => {
      try { //This try is solve the Type undifined error
        setapplicationId(data[index].applicationId)
        //console.log("Direct = ", data[index].customerId)
      } catch (error) {
        console.log('Spec', error)
      }
    })
    console.log(applicationid)
 
  const changeSelectOptionHandlerApplicationName = (event) => {
   setApplicationName(event.target.value)
  }
 //-Dropdown selection handler End-

//-Dropdown selection handler for App Env Name-
const changeSelectOptionHandlerEnvName = (event) => {
  setEnvName(event.target.value)
}
console.log(envname)
//-Dropdown selection handler End-

  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-app-partition-details`, {
       appEnvName : envname,
       appPartitionDescription: apppartitiondescription,
       appPartitionId : pk,
       appPartitionName : apppartitionname,
       applicationId : applicationid,
       applicationName : applicationname
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
//-Update Method End
//--Fetching Dropdown
useEffect(() => { 
  // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-applications`
    
  )
  .then((response) => {
    // Handle success.
    console.log("Connection established.Data is fetching from list Applications!")
    setData(response.data.data)
    console.log(response.data.data)
    })
    .catch((error) => {
      console.error(error)
 })
}, [])
//--Fetching Dropdown

useEffect(() => { 
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-envNames`)
  .then((response) => {
    // Handle success.
    console.log("Connection established.Data is fetching from Env Names!")
   setDataTwo(response.data.data)
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
        <h5 className='modal-title'style={{color:'black'}}>Update Application Partition Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <FormGroup>
        <Label for='Ostechname' style={{fontSize:'1rem'}}>Application Name</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='AppName'
          value={applicationname}
          onChange={changeSelectOptionHandlerApplicationName}>
          <option> Choose partition details</option>

            {data.map(item => (
              <option
                key={data.applicationName}
                value={data.applicationId}
              >
                {item.applicationName}
              </option>
            ))}
        </Input>
        </InputGroup>
        </FormGroup>

        <FormGroup>
        <Label for='Ostechname' style={{fontSize:'1rem'}}>Application Environment</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Appenv'
          value={envname} 
          onChange={changeSelectOptionHandlerEnvName}>
          <option> Choose partition details</option>
              
            {datatwo.map(item => (
              <option
                key={data.appEnvName}
                value={data.appEnvName}
              >
                {item.appEnvName}
              </option>
            ))}
        </Input>
        </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='isctechcategorytags' style={{fontSize:'1rem'}}>Partition Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PartitionName' name='PartitionName'
            value={apppartitionname} 
            onChange={(e) => setappPartitionName(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='isctechcategorydescription' style={{fontSize:'1rem'}}>Discription</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Discription' name='Discription'
            value={apppartitiondescription} 
            onChange={(e) => setappPartitionDescription(e.target.value)} />
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
