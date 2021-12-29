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
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const [data, setData] = useState([])
  const [businessgroupname, setbusinessGroupName] = useState("")
  const [businessgroupid, setbusinessgroupId] = useState("")
  const [fgcontactdeptname, setfgContactDeptName] = useState("")
  const [fgcontactemail1, setfgContactEmail1] = useState("")
  const [fgcontactemail2, setfgContactEmail2] = useState("")
  const [fgcontactfristname, setfgContactFristName] = useState("")
  const [fgcontactlastname, setfgContactLastName] = useState("")
  const [fgcontactphone1, setfgContactPhone1] = useState()
  const [fgcontactphone1isd, setfgContactPhone1Isd] = useState()
  const [fgcontactphone2, setfgContactPhone2] = useState()
  const [fgcontactphone2isd, setfgContactPhone2Isd] = useState()
  const [fgdescription, setfgDescription] = useState("")
  const [fgid, setfgId] = useState("")
  const [fglevel, setfgLevel] = useState("Root 1")
  const [fgname, setfgName] = useState("")
  const [toplevelfgid, settopLevelFgId] = useState()
  const [toplevelfglevel, settopLevelFgLevel] = useState("")
 
  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  const [dummy, setDummy] = useState([])

  //-Fg level
   const changeSelectOptionHandlefgLevel = (event) => {
     setfgLevel(event.target.value)
   }
   console.log(fglevel)
  // --
  //-Dropdown selection handler-
  const [customerbusinessname, setcustomerBusinessName] = useState('')
  
   // Variale to store the index value of selected option
 
   const index = data.findIndex(obj => obj.businessGroupName === customerbusinessname)
   console.log("Index value = ", index)// Printing the index value of selected option

   useEffect(() => {
     try { //This try is solve the Type undifined error
       setDummy(data[index].businessGroupId)
       //console.log("Direct = ", data[index].customerId)
     } catch (error) {
       console.log('Spec', error)
     }
   })
   console.log(dummy)

   const changeSelectOptionHandlecustomerId = (event) => {
     setcustomerBusinessName(event.target.value)
     }
  const handlePost = (evt) => {
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-functional-group-details`, {
      businessGroupName : customerbusinessname,
      businessGroupId : dummy,
      fgContactDeptName : fgcontactdeptname,
      fgContactEmail1 : fgcontactemail1,
      fgContactEmail2 : fgcontactemail2,
      fgContactFristName : fgcontactfristname,
      fgContactLastName : fgcontactlastname,
      fgContactPhone1 : fgcontactphone1,
      fgContactPhone1Isd : fgcontactphone1isd,
      fgContactPhone2 : fgcontactphone2,
      fgContactPhone2Isd : fgcontactphone2isd,
      fgDescription : fgdescription,
      fgLevel : fglevel,
      fgName : fgname,
      topLevelFgId : toplevelfgid,
      topLevelFgLevel : toplevelfglevel
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
        } else if (response.data.message === "you are trying to convert character to number") {
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
        console.log(error.message)
      })
  }
 
 //--Fetching Dropdown API 1

 useEffect(() => { 
  // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-businessGroupNames`
    
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
//

// Validation Part Begins
  const SignupSchema = yup.object().shape({
    Email1: yup.string().email().required(),
    Email2: yup.string().email().required(),
    Phone1: yup.number().required().positive().integer(),
    Phone2: yup.number().required().positive().integer(),
    Phone1ISD: yup.number().required().positive().integer(),
    Phone2ISD: yup.number().required().positive().integer(),
    FirstName: yup.string().min(3).required(),
    LastName: yup.string().min(3).required(),
    FunctionalGroup: yup.string().min(5).required(),
    TopLevelID: yup.number().required().positive().integer(),
    TopLevelFGLevel: yup.string().min(5).required(),
    Description: yup.string().max(500).required(),
    Department : yup.string().min(3).required()
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
        <h5 className='modal-title'style={{color:'black'}}>New Functional Group Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
          <Label for='FunctionalGroup' style={{fontSize:'1rem'}}>Functional Group </Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='FunctionalGroup' 
             name='FunctionalGroup' 
             innerRef={register({ required: true })} 
             invalid={errors.FunctionalGroup && true}
              placeholder='' 
              onChange={(e) => setfgName(e.target.value)}/>
            {errors && errors.FunctionalGroup && <FormFeedback>Functional Group Name must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
        <Label for='fglevel' style={{fontSize:'1rem'}}>Functional Group Level</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='fglevel'
            onChange={changeSelectOptionHandlefgLevel}
           >
           <option value='Root 1'>Root 1</option>
           <option value='Root 2'>Root 2</option>
           <option value='Root 3'>Root 3</option>
           <option value='Root 4'>Root 4</option>
        </Input>
        </InputGroup>
        </FormGroup>
           
        <FormGroup>
        <Label for='Business-Group-Name' style={{fontSize:'1rem'}}>Business Group Name</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Business-Group-Name'
            onChange={changeSelectOptionHandlecustomerId}
           >
           <option> Choose Customer Business </option>
            {data.map(item => (
              <option
                key={data.businessGroupName}
                value={data.businessGroupName}
                // onClick={dropAction}
              >
                {item.businessGroupName}
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
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='Description' type='textarea' rows ='2'
             name='Description' 
             innerRef={register({ required: true })} 
             invalid={errors.Description && true}
              placeholder='' 
              onChange={(e) => setfgDescription(e.target.value)}/>
            {errors && errors.Description && <FormFeedback>Maximun 500 characters are allowed </FormFeedback>}
          </InputGroup>
        </FormGroup>

      <FormGroup>
          <Label for='TopLevelID' style={{fontSize:'1rem'}}>Top Level ID</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='TopLevelID' 
             name='TopLevelID' 
             innerRef={register({ required: true })} 
             invalid={errors.TopLevelID && true}
              placeholder='' 
              onChange={(e) => settopLevelFgId(e.target.value)}/>
            {errors && errors.TopLevelID && <FormFeedback>{errors.TopLevelID.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

      <FormGroup>
          <Label for='TopLevelFGLevel' style={{fontSize:'1rem'}}>Top Level FG Level</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='TopLevelFGLevel' 
             name='TopLevelFGLevel' 
             innerRef={register({ required: true })} 
             invalid={errors.TopLevelFGLevel && true}
              placeholder='' 
              onChange={(e) => settopLevelFgLevel(e.target.value)}/>
            {errors && errors.TopLevelFGLevel && <FormFeedback>Top Level FG Level must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='Department' style={{fontSize:'1rem'}}>Department Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='Department' 
             name='Department' 
             innerRef={register({ required: true })} 
             invalid={errors.Department && true}
              placeholder='' 
              onChange={(e) => setfgContactFristName(e.target.value)}/>
            {errors && errors.Department && <FormFeedback>First Namemust be at least 3 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
      <FormGroup>
          <Label for='FirstName' style={{fontSize:'1rem'}}>First Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='FirstName' 
             name='FirstName' 
             innerRef={register({ required: true })} 
             invalid={errors.FirstName && true}
              placeholder='' 
              onChange={(e) => setfgContactDeptName(e.target.value)}/>
            {errors && errors.FirstName && <FormFeedback>First Namemust be at least 3 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
      <FormGroup>
          <Label for='LastName' style={{fontSize:'1rem'}}>Last Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='LastName' 
             name='LastName' 
             innerRef={register({ required: true })} 
             invalid={errors.LastName && true}
              placeholder='' 
              onChange={(e) => setfgContactLastName(e.target.value)}/>
            {errors && errors.LastName && <FormFeedback>Last Name must be at least 3 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
      <FormGroup>
          <Label for='Phone1' style={{fontSize:'1rem'}}>Phone 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='Phone1' 
             name='Phone1' 
             innerRef={register({ required: true })} 
             invalid={errors.Phone1 && true}
              placeholder='' 
              onChange={(e) => setfgContactPhone1(e.target.value)}/>
            {errors && errors.Phone1 && <FormFeedback>{errors.Phone1.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
      <FormGroup>
          <Label for='Phone2' style={{fontSize:'1rem'}}>Phone 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='Phone2' 
             name='Phone2' 
             innerRef={register({ required: true })} 
             invalid={errors.Phone2 && true}
              placeholder='' 
              onChange={(e) => setfgContactPhone2(e.target.value)}/>
            {errors && errors.Phone2 && <FormFeedback>{errors.Phone2.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Phone1ISD' style={{fontSize:'1rem'}}>Phone 1 ISD</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='Phone1ISD' 
             name='Phone1ISD' 
             innerRef={register({ required: true })} 
             invalid={errors.Phone1ISD && true}
              placeholder='' 
              onChange={(e) => setfgContactPhone1Isd(e.target.value)}/>
            {errors && errors.Phone1ISD && <FormFeedback>{errors.Phone1ISD.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Phone2ISD' style={{fontSize:'1rem'}}>Phone 2 ISD</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='Phone2ISD' 
             name='Phone2ISD' 
             innerRef={register({ required: true })} 
             invalid={errors.Phone2ISD && true}
              placeholder='' 
              onChange={(e) => setfgContactPhone2Isd(e.target.value)}/>
            {errors && errors.Phone2ISD && <FormFeedback>{errors.Phone2ISD.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Email1' style={{fontSize:'1rem'}}>Email 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='Email1' 
             name='Email1' 
             innerRef={register({ required: true })} 
             invalid={errors.Email1 && true}
              placeholder='' 
              onChange={(e) => setfgContactEmail1(e.target.value)}/>
            {errors && errors.Email1 && <FormFeedback>{errors.Email1.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Email2' style={{fontSize:'1rem'}}>Email 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text'
             id='Email2' 
             name='Email2' 
             innerRef={register({ required: true })} 
             invalid={errors.Email2 && true}
              placeholder='' 
              onChange={(e) => setfgContactEmail2(e.target.value)}/>
            {errors && errors.Email2 && <FormFeedback>{errors.Email2.message}</FormFeedback>}
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