// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { Database, X, Cpu, Layers, Command } from 'react-feather'
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
  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  const [appsubpartitiondescription, setappSubPartitionDescription] = useState("")
  const [appsubpartitionname, setappSubPartitionName] = useState("")
  const [pk, setPk] = useState('')
  //-Dropdown selection handler-
  const [apppartitionname, setappPartitionName] = useState('')
  const [applicationid, setapplicationId] = useState([])
  const [apppartitionnamepush, setappPartitionNamePush] = useState('')
  console.log("App  part id = ", applicationid)
  
  const index2 = data.findIndex(obj => obj.appPartitionId === applicationid)
  console.log("Index value appSubPartitionId  = ", index2)
  console.log("Index value apppartitionnamepush  = ", apppartitionnamepush)
  useEffect(() => {
    try { //This try is solve the Type undifined error
      setappPartitionNamePush(data[index2].appPartitionName)
      //console.log("Direct = ", data[index].customerId)
    } catch (error) {
      console.log('Spec', error)
    }
  })
 
  const index = data.findIndex(obj => obj.appPartitionName === apppartitionname)
  console.log("Index value = ", index)// Printing the index value of selected option

  useEffect(() => {
    try { //This try is solve the Type undifined error
      setapplicationId(data[index].appPartitionId)
      //console.log("Direct = ", data[index].customerId)
    } catch (error) {
      console.log('Spec', error)
    }
  })
 
const changeSelectOptionHandlerapppartitionname = (event) => {
  setappPartitionName(event.target.value)
}
//-Dropdown selection handler End-

  //-Update Method
  useEffect(() => {
    setPk(value.appSubPartitionId)
       })
  useEffect(() => {
    setapplicationId(value.appPartitionId)
    setappSubPartitionDescription(value.appSubPartitionDescription)
    setappSubPartitionName(value.appSubPartitionName)
 }, [value])

  const handlePost = (evt) => {
   
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-app-sub-partition-details`, {
        appPartitionId : applicationid,
        appSubPartitionDescription : appsubpartitiondescription,
        appSubPartitionName : appsubpartitionname,
        appSubPartitionId : pk
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
//--Fetching Dropdown
useEffect(() => { 
  // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-appPartitions`
    
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

return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>Update Application Sub Partition Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <FormGroup>
        <Label for='Ostechname' style={{fontSize:'1rem'}}>Application Partition</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='select-basic' 
          value={apppartitionnamepush}
          onChange={changeSelectOptionHandlerapppartitionname}>
          <option> Choose partition name</option>

            {data.map(item => (
              <option
                key={data.appPartitionName}
                value={data.appPartitionName}
                
              >
                {item.appPartitionName}
              </option>
            ))}
        </Input>
        </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='businessName' style={{fontSize:'1rem'}}>Application Sub Partition Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='businessName' name='businessName'
            value={appsubpartitionname}
              onChange={(e) => setappSubPartitionName(e.target.value)} />
          </InputGroup>
        </FormGroup>
         
        <FormGroup>
          <Label for='Description' style={{fontSize:'1rem'}}>Description</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Description' name='Description'
            type='textarea'
            rows='3'
            value={appsubpartitiondescription} 
            onChange={(e) => setappSubPartitionDescription(e.target.value)} />
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
