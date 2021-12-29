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
  const [datatwo, setDataTwo] = useState([])
  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [appResPartitionAdId, setappResPartitionAdId] = useState("")
  const [resPartitionAdId, setresPartitionAdId] = useState("")
  
  const [partitionName, setpartitionName] = useState("")
  const [subPartitionId, setsubPartitionId] = useState("")
  const index = data.findIndex(obj => obj.appSubPartitionName === partitionName)
  console.log("Index Name = ", index)
  useEffect(() => {
  try {
    setsubPartitionId(data[index].appSubPartitionId)
  } catch (error) {
    console.log('Spec', error)
  }
  })  
  const changeSelectPartition = (event) => {
    setpartitionName(event.target.value)
  }
  const changeSelectPartitionId = (event) => {
    setresPartitionAdId(event.target.value)
  }
  //-------------------------Update Method---------------------------------------------
  // useEffect(() => {
  //   setIscOsCategoryName(value.iscOsTechName)
  //  })
  useEffect(() => {
    setsubPartitionId(value.appSubPartitionId)
    setappResPartitionAdId(value.ociAppResPartitionAdId)
    setresPartitionAdId(value.ociResPartitionAdId)
    setpartitionName(value.app_sub_partitionName)
 }, [value])

  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-oci-app-res-partition-ad`, {
      appSubPartitionId : subPartitionId,
      ociAppResPartitionAdId : appResPartitionAdId,
      ociResPartitionAdId : resPartitionAdId
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
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-partitionAdIds`
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
        <h5 className='modal-title'style={{color:'black'}}>Update OCI Application Respartition AD Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <FormGroup>
        <Label for='Partition-AD' style={{fontSize:'1rem'}}> OCI Resource Partition AD</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Partition-AD' 
          value={resPartitionAdId}
          onChange={changeSelectPartitionId}>
            <option selected disabled hidden>OCI Resource Partition AD</option>
            {datatwo.map(item => (
              <option
                key={datatwo.ociResPartitionAdId}
                value={datatwo.ociResPartitionAdId}
              >
                {item.ociResPartitionAdId}
              </option>
            ))}
        </Input>
        </InputGroup>
      </FormGroup>

      <FormGroup>
        <Label for='Partition-Name' style={{fontSize:'1rem'}}>Partition Name</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Partition-Name'
          value={partitionName}
          onChange={changeSelectPartition}>
            <option selected disabled hidden>Partition Name</option>
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
