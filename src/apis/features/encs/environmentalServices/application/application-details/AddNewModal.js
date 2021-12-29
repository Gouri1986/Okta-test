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

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )

  const [data, setData] = useState([])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const [applicationcontactdeptname, setapplicationContactDeptName] = useState("")
  const [applicationcontactemail1, setapplicationContactEmail1] = useState("")
  const [applicationcontactemail2, setapplicationContactEmail2] = useState("")
  const [applicationcontactfirstname, setapplicationContactFirstName] = useState("")
  const [applicationcontactlastname, setapplicationContactLastName] = useState("")
  const [applicationcontactphone1, setapplicationContactPhone1] = useState()
  const [applicationcontactphone1isd, setapplicationContactPhone1ISD] = useState()
  const [applicationcontactphone2, setapplicationContactPhone2] = useState()
  const [applicationcontactphone2isd, setapplicationContactPhone2ISD] = useState()
  const [applicationdescription, setapplicationDescription] = useState("")
  const [applicationid, setapplicationId] = useState("")
  const [applicationname, setapplicationName] = useState("")
  const [dummy, setDummy] = useState([])
  const [fgname, setFgName] = useState('')

  const index = data.findIndex(obj => obj.fgName === fgname)
  console.log("Index value = ", index)// Printing the index value of selected option

    useEffect(() => {
      try { //This try is solve the Type undifined error
        setDummy(data[index].fgId)
        //console.log("Direct = ", data[index].customerId)
      } catch (error) {
        console.log('Spec', error)
      }
    })
    console.log(dummy)

  //-Fg Id Dropdown selection handler-
 
  const changeSelectOptionHandlerFgId = (event) => {
    setFgName(event.target.value)
  }
 //-Dropdown selection handler End-

  const handlePost = (evt) => {
    console.log(applicationcontactdeptname)
    console.log(applicationcontactemail1)
    console.log(applicationcontactemail2)
    console.log(applicationcontactfirstname)
    console.log(applicationcontactlastname)
    console.log(applicationcontactphone1)
    console.log(applicationcontactphone1isd)
    console.log(applicationcontactphone2)
    console.log(applicationcontactphone2isd)
    console.log(applicationdescription)
    console.log(applicationid)
    console.log(applicationname)
    console.log(dummy)
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-application-details`, {
      applicationContactDeptName:applicationcontactdeptname, 
      applicationContactEmail1:applicationcontactemail1,
      applicationContactEmail2:applicationcontactemail2,
      applicationContactFirstName:applicationcontactfirstname,
      applicationContactLastName:applicationcontactlastname,
      applicationContactPhone1:applicationcontactphone1,
      applicationContactPhone1ISD:applicationcontactphone1isd,
      applicationContactPhone2:applicationcontactphone2,
      applicationContactPhone2ISD:applicationcontactphone2isd,
      applicationDescription:applicationdescription,
      applicationId:applicationid,
      applicationName:applicationname,
      fgId:dummy
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
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-fgdetails`
    
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

  // Validation Part Begins
  const SignupSchema = yup.object().shape({
    PrimaryEmail: yup.string().email().required(),
    SecondaryEmail: yup.string().email().required(),
    Phone1: yup.number().required().positive().integer(),
    Phone2: yup.number().required().positive().integer(),
    Phone1ISD: yup.number().required().positive().integer(),
    Phone2ISD: yup.number().required().positive().integer(),
    FirstName: yup.string().min(3).required(),
    LastName: yup.string().min(3).required(),
    DepartmentName: yup.string().min(5).required(),
    ApplicationName: yup.string().min(5).required(),
    Description: yup.string().max(500).required()
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
        <h5 className='modal-title'style={{color:'black'}}>Application Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
          <Label for='ApplicationName' style={{fontSize:'1rem'}}>Application Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='ApplicationName' 
            name='ApplicationName' 
            innerRef={register({ required: true })} 
            invalid={errors.ApplicationName && true}  
            onChange={(e) => setapplicationName(e.target.value)} />
            {errors && errors.ApplicationName && <FormFeedback>Application Name must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
              
        <FormGroup>
        <Label for='fgid' style={{fontSize:'1rem'}}>Functional Group </Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='fgid' id='fgid-basic' onChange={changeSelectOptionHandlerFgId}>
            <option disabled hidden selected> Choose functional group </option>
            {data.map(item => (
              <option
                key={data.fgName}
                value={data.fgName}
                >
                {item.fgName}
              </option>
            ))}
        </Input>
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
            <Input id='Description' type='textarea' rows = '2'
            name='Description' 
            innerRef={register({ required: true })} 
            invalid={errors.Description && true}  
            onChange={(e) => setapplicationDescription(e.target.value)} />
            {errors && errors.Description && <FormFeedback>Maximum 500 characters are allowed</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='FirstName' style={{fontSize:'1rem'}}>First Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='FirstName' 
            name='FirstName' 
            innerRef={register({ required: true })} 
            invalid={errors.FirstName && true}  
            onChange={(e) => setapplicationContactFirstName(e.target.value)} />
            {errors && errors.FirstName && <FormFeedback>First Name must be at least 3 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='LastName' style={{fontSize:'1rem'}}>Last Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='LastName' 
            name='LastName' 
            innerRef={register({ required: true })} 
            invalid={errors.LastName && true}  
            onChange={(e) => setapplicationContactLastName(e.target.value)} />
            {errors && errors.LastName && <FormFeedback>Last Name must be at least 3 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
      <FormGroup>
          <Label for='DepartmentName' style={{fontSize:'1rem'}}>Department Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='DepartmentName' 
            name='DepartmentName' 
            innerRef={register({ required: true })} 
            invalid={errors.DepartmentName && true}  
            onChange={(e) => setapplicationContactDeptName(e.target.value)} />
            {errors && errors.DepartmentName && <FormFeedback>Department Name must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
               
        <FormGroup>
          <Label for='Phone1' style={{fontSize:'1rem'}}>Phone 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Phone1' 
            name='Phone1' 
            innerRef={register({ required: true })} 
            invalid={errors.Phone1 && true}  
            onChange={(e) => setapplicationContactPhone1(e.target.value)} />
            {errors && errors.Phone1 && <FormFeedback>{errors.Phone1.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Phone2' style={{fontSize:'1rem'}}>Phone 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Phone2' 
            name='Phone2' 
            innerRef={register({ required: true })} 
            invalid={errors.Phone2 && true}  
            onChange={(e) => setapplicationContactPhone2(e.target.value)} />
            {errors && errors.Phone2 && <FormFeedback>{errors.Phone2.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Phone1ISD' style={{fontSize:'1rem'}}>Phone 1 ISD</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Phone1ISD' 
            name='Phone1ISD' 
            innerRef={register({ required: true })} 
            invalid={errors.Phone1ISD && true}  
            onChange={(e) => setapplicationContactPhone1ISD(e.target.value)} />
            {errors && errors.Phone1ISD && <FormFeedback>{errors.Phone1ISD.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Phone2ISD' style={{fontSize:'1rem'}}>Phone 2 ISD</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Phone2ISD' 
            name='Phone2ISD' 
            innerRef={register({ required: true })} 
            invalid={errors.Phone2ISD && true}  
            onChange={(e) => setapplicationContactPhone2ISD(e.target.value)} />
            {errors && errors.Phone2ISD && <FormFeedback>{errors.Phone2ISD.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='PrimaryEmail' style={{fontSize:'1rem'}}>Primary Email</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PrimaryEmail' 
            name='PrimaryEmail' 
            innerRef={register({ required: true })} 
            invalid={errors.PrimaryEmail && true}  
            onChange={(e) => setapplicationContactEmail1(e.target.value)} />
            {errors && errors.PrimaryEmail && <FormFeedback>{errors.PrimaryEmail.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='SecondaryEmail' style={{fontSize:'1rem'}}>Secondary Email</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='SecondaryEmail' 
            name='SecondaryEmail' 
            innerRef={register({ required: true })} 
            invalid={errors.SecondaryEmail && true}  
            onChange={(e) => setapplicationContactEmail2(e.target.value)} />
            {errors && errors.SecondaryEmail && <FormFeedback>{errors.SecondaryEmail.message}</FormFeedback>}
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