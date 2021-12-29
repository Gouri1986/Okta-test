// ** React Imports
import { useState, useEffect} from 'react'
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

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  const [appsubpartitiondescription, setappSubPartitionDescription] = useState("")
  const [appsubpartitionname, setappSubPartitionName] = useState("")
 
  //-Dropdown selection handler-
  const [apppartitionname, setappPartitionName] = useState('')
  const [applicationid, setapplicationId] = useState([])

  const index = data.findIndex(obj => obj.appPartitionName === apppartitionname)
  console.log("Index value = ", index)// Printing the index value of selected option

  useEffect(() => {
    try { //This try is solve the Type undifined error
      setapplicationId(data[index].appPartitionId)
    } catch (error) {
      console.log('Spec', error)
    }
  })
  console.log(applicationid)
  console.log(appsubpartitiondescription)
  console.log(apppartitionname)

const changeSelectOptionHandlerapppartitionname = (event) => {
  setappPartitionName(event.target.value)
}
//-Dropdown selection handler End-

  const handlePost = (evt) => {
    
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-app-sub-partition-details`, {
        appPartitionId : applicationid,
        appSubPartitionDescription : appsubpartitiondescription,
        appSubPartitionName : appsubpartitionname
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

  // Validation Part Begins
  const SignupSchema = yup.object().shape({
    SubPartitionName: yup.string().min(5).required(),
    SubPartitionDescription: yup.string().max(500).required()
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
        <h5 className='modal-title'style={{color:'black'}}>New Application Sub Partition Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label for='Application-Partition' style={{fontSize:'1rem'}}>Application Partition</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Application-Partition' onChange={changeSelectOptionHandlerapppartitionname}>
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
          <Label for='SubPartitionName' style={{fontSize:'1rem'}}>Application Sub Partition Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='SubPartitionName' name='SubPartitionName'
             innerRef={register({ required: true })} invalid={errors.SubPartitionName && true} placeholder=''
              onChange={(e) => setappSubPartitionName(e.target.value)} />
            {errors && errors.SubPartitionName && <FormFeedback>Application Sub Partition Name must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        
      <FormGroup>
          <Label for='SubPartitionDescription' style={{fontSize:'1rem'}}>Description</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Clipboard size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='textarea' 
            rows='3' 
            id='SubPartitionDescription' 
            name='SubPartitionDescription' 
            innerRef={register({ required: true })} 
            invalid={errors.SubPartitionDescription && true} 
            placeholder=''  onChange={(e) =>  setappSubPartitionDescription(e.target.value)} />
            {errors && errors.SubPartitionDescription && <FormFeedback>Maximum 500 characters are allowed</FormFeedback>}
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