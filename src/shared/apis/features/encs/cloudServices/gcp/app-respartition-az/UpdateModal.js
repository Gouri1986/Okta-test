// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Database, Mail, Calendar, DollarSign, X, Cpu, Layers, Command } from 'react-feather'
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
  const [data, setData] = useState([])
  const [datatwo, setDataTwo] = useState([])

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [subPartitionId, setsubPartitionId] = useState("")
  const [subPartitionname, setsubPartitionname] = useState("")
  const [appResPartitionAzId, setappResPartitionAzId] = useState("")
  const [resPartitionAzId, setresPartitionAzId] = useState("")

  const index = data.findIndex(obj => obj.appSubPartitionName === subPartitionname)
  console.log("Index Name = ", index)
  useEffect(() => {
  try {
    setsubPartitionId(data[index].appSubPartitionId)
  } catch (error) {
    console.log('Spec', error)
  }
  })
  const changepartition = (event) => {
    setsubPartitionname(event.target.value)
  }
  const changegcprespartition = (event) => {
    setresPartitionAzId(event.target.value)
  }
  //-------------------------Update Method---------------------------------------------
  useEffect(() => {
    setappResPartitionAzId(value.gcpAppResPartitionAzId)
   })
  useEffect(() => {
    setsubPartitionId(value.appSubPartitionId)
    setsubPartitionname(value.appSubPartitionName)
    setresPartitionAzId(value.gcpResPartitionAzId)
 }, [value])

  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-gcp-app-res-partition-az`, {
      appSubPartitionId : subPartitionId,
      appSubPartitionName : subPartitionname,
      gcpAppResPartitionAzId :appResPartitionAzId,
      gcpResPartitionAzId :resPartitionAzId
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
//-------------------------Update Method End---------------------------------------------
  //--Fetching Dropdown
  useEffect(() => { 
    // if (isLoaded === false) {
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-appSubPartitions`
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
  //--Fetching Dropdown ends

  //--Fetching Dropdown
  useEffect(() => { 
    // if (isLoaded === false) {
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-gcpResPArtitionAzId`
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
  //--Fetching Dropdown ends

return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>Update GCP Application Resource Partition AZ</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <FormGroup>
        <Label for='Partition-AZ' style={{fontSize:'1rem'}}>GCP Resource Partition AZ</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Partition-AZ'
          value={resPartitionAzId}
          onChange={changegcprespartition}>
            {datatwo.map(item => (
              <option
                key={datatwo.gcpResPartitionAzId}
                value={datatwo.gcpResPartitionAzId}
                
              >
                {item.gcpResPartitionAzId}
              </option>
            ))}
        </Input>
        </InputGroup>
        </FormGroup> 
        <FormGroup>
        <Label for='ApplicationSubPartition' style={{fontSize:'1rem'}}>Application Sub Partition</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='ApplicationSubPartition'
          value={subPartitionname}
          onChange={changepartition}>
            {data.map(item => (
              <option
                key={data.appSubPartitionName}
                value={data.appSubPartitionName}
                
              >
                {item.appSubPartitionName}
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
