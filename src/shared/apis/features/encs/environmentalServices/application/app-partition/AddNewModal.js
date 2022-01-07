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
  const [apppartitiondescription, setappPartitionDescription] = useState("")
  const [apppartitionname, setappPartitionName] = useState("")

  //-Dropdown selection handler for application name adn Id-
  const [applicationname, setApplicationName] = useState('')
  const [applicationid, setapplicationId] = useState([])

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
const [envname, setEnvName] = useState('')
const changeSelectOptionHandlerEnvName = (event) => {
  setEnvName(event.target.value)
}
console.log(envname)
//-Dropdown selection handler End-

  const handlePost = (evt) => {
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-app-partition-details`, {
      appEnvName : envname,
      appPartitionDescription : apppartitiondescription,
      appPartitionName : apppartitionname,
      applicationId : applicationid,
      applicationName :applicationname
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
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-applications`
      
    )
    .then((response) => {
      // Handle success.
      console.log("Connection established.Data is fetching from list Applications!")
      setData(response.data.data)
     // console.log(response.data.data)
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

  // Validation Part Begins
  const SignupSchema = yup.object().shape({
    PartitionName: yup.string().min(5).required(),
    AppDiscription: yup.string().max(500).required()

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
        <h5 className='modal-title'style={{color:'black'}}>New Application Partition Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
         
        <FormGroup>
        <Label for='Application-Name' style={{fontSize:'1rem'}}>Application Name</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Application-Name' onChange={changeSelectOptionHandlerApplicationName}>
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
        <Label for='Application-Environment' style={{fontSize:'1rem'}}>Application Environment</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Application-Environment' onChange={changeSelectOptionHandlerEnvName}>
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
            innerRef={register({ required: true })} invalid={errors.PartitionName && true} 
            onChange={(e) => setappPartitionName(e.target.value)} />
            {errors && errors.PartitionName && <FormFeedback>Partition Name must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='AppDiscription' style={{fontSize:'1rem'}}>Discription</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='AppDiscription' name='AppDiscription' type = 'textarea' rows = '2'
            innerRef={register({ required: true })} invalid={errors.AppDiscription && true} 
            onChange={(e) => setappPartitionDescription(e.target.value)} />
          </InputGroup>
          {errors && errors.AppDiscription && <FormFeedback>Maximum 500 characters are allowed</FormFeedback>}
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