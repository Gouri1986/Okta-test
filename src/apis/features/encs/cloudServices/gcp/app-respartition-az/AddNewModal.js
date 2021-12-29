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
  const [data, setData] = useState([])
  const [datatwo, setDataTwo] = useState([])

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
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
  const handlePost = (evt) => {
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-gcp-app-res-partition-az`, {
          appSubPartitionId : subPartitionId,
          appSubPartitionName : subPartitionname,
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

  // Validation Part Begins
  const SignupSchema = yup.object().shape({
    // email: yup.string().email().required(),
    OsCategoryName: yup.string().min(5).required(),
    OsCategorytag: yup.string().min(5).required(),
    Ostechname: yup.string().min(5).required(),
    setIscOsCategoryDescription: yup.string().max(500).required()
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
        <h5 className='modal-title'style={{color:'black'}}>New GCP Application Resource Partition AZ</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
     
        <FormGroup>
        <Label for='Partition-AZ' style={{fontSize:'1rem'}}>GCP Resource Partition AZ</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Partition-AZ' onChange={changegcprespartition}>
          <option disabled hidden selected>Choose Resource Partition AZ</option>
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
          <Input type='select' name='select' id='ApplicationSubPartition' onChange={changepartition}>
          <option disabled hidden selected>Choose Application Sub Partition</option>
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