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

const AddNewModal = ({ open, handleModal, fetchData}) => {
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
  const [businessgroupdescription, setbusinessGroupDescription] = useState('')
  const [businessgroupcontactfirstname, setbusinessGroupContactFirstName] = useState('')
  const [businessgroupcontactlasttname, setbusinessGroupContactLastName] = useState('')
  const [businessgroupcontactdeptname, setbusinessGroupContactDeptName] = useState('')
  const [businessgroupcontactphone1, setbusinessGroupContactPhone1] = useState()
  const [businessgroupcontactphone2, setbusinessGroupContactPhone2] = useState()
  const [businessgroupcontactphone1isd, setbusinessGroupContactPhone1ISD] = useState()
  const [businessgroupcontactphone2isd, setbusinessGroupContactPhone2ISD] = useState()
  const [businessgroupcontactemail1, setbusinessGroupContactEmail1] = useState('')
  const [businessgroupcontactemail2, setbusinessGroupContactEmail2] = useState('')

  const [dummy, setDummy] = useState([])
  
   //-Dropdown selection handler-
   const [customerbusinessname, setcustomerBusinessName] = useState('')
   
    // Variale to store the index value of selected option
    const index = data.findIndex(obj => obj.customerBusinessName === customerbusinessname)
    console.log("Index value = ", index)// Printing the index value of selected option

    useEffect(() => {
      try { //This try is solve the Type undifined error
        setDummy(data[index].customerId)
        //console.log("Direct = ", data[index].customerId)
      } catch (error) {
        console.log('Spec', error)
      }
    })
    console.log("customerbusinessname = ", customerbusinessname)
    console.log("Id = ", dummy)

    const changeSelectOptionHandlecustomerId = (event) => {
      setcustomerBusinessName(event.target.value)
      }
    //  

     //-Dropdown selection handler-
   const [businessgroupname, setbusinessGroupName] = useState('')
 
  const handlePost = (evt) => {
  
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-business-group-details`, {
      businessGroupContactDeptName : businessgroupcontactdeptname,
      businessGroupContactEmail1 : businessgroupcontactemail1,
      businessGroupContactEmail2 : businessgroupcontactemail2,
      businessGroupContactFirstName : businessgroupcontactfirstname,
      businessGroupContactLastName : businessgroupcontactlasttname,
      businessGroupContactPhone1 : businessgroupcontactphone1,
      businessGroupContactPhone1ISD : businessgroupcontactphone1isd,
      businessGroupContactPhone2 : businessgroupcontactphone2,
      businessGroupContactPhone2ISD : businessgroupcontactphone2isd,
      businessGroupDescription : businessgroupdescription,
      businessGroupName : businessgroupname,
      customerBusinessName : customerbusinessname,
      customerId : dummy
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
//--Fetching Dropdown ends
   //--Fetching Dropdown

   useEffect(() => { 
    // if (isLoaded === false) {
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-businessGroupNames`
    )
    .then((response) => {
      // Handle success.
      console.log("Connection established.Data is fetching!")
      // const options = data.map(d => ({
      //   value : d.id,
      //   label : d.name
      // }))
     //  setIsLoaded(true)
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
    Email1: yup.string().email().required(),
    Email2: yup.string().email().required(),
    Phone1: yup.number().required().positive().integer(),
    Phone2: yup.number().required().positive().integer(),
    Phone1ISD: yup.number().required().positive().integer(),
    Phone2ISD: yup.number().required().positive().integer(),
    FirstName: yup.string().min(3).required(),
    LastName: yup.string().min(3).required(),
    DepartmentName: yup.string().min(5).required(),
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
        <h5 className='modal-title'style={{color:'black'}}>New Business Group Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
          <Label for='BusinessGroup' style={{fontSize:'1rem'}}>Business Group</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='BusinessGroup'
              name='BusinessGroup' 
              innerRef={register({ required: true })} 
              invalid={errors.FirstName && true} 
              onChange={(e) => setbusinessGroupName(e.target.value)} 
             />
            {errors && errors.FirstName && <FormFeedback>Fisrt Name must be at least 3 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>

      <FormGroup>
        <Label for='Customer' style={{fontSize:'1rem'}}>Customer</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='cid'
            onChange={changeSelectOptionHandlecustomerId}
           >
           <option> Choose Customer </option>
            {data.map(item => (
              <option
                key={data.customerBusinessName}
                value={data.customerBusinessName}
                // onClick={dropAction}
              >
                {item.customerBusinessName}
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
            <Input id='Description' 
              name='Description' type ='textarea' rows = '2'
              innerRef={register({ required: true })} 
              invalid={errors.Description && true} 
              onChange={(e) => setbusinessGroupDescription(e.target.value)} 
             />
            {errors && errors.Description && <FormFeedback>Maximun 500 characters are allowed </FormFeedback>}
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
              onChange={(e) => setbusinessGroupContactFirstName(e.target.value)} 
             />
            {errors && errors.FirstName && <FormFeedback>Fisrt Name must be at least 3 characters</FormFeedback>}
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
              onChange={(e) => setbusinessGroupContactLastName(e.target.value)} 
             />
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
              onChange={(e) => setbusinessGroupContactDeptName(e.target.value)} 
             />
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
              onChange={(e) => setbusinessGroupContactPhone1(e.target.value)} 
             />
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
              onChange={(e) => setbusinessGroupContactPhone2(e.target.value)} 
             />
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
              onChange={(e) => setbusinessGroupContactPhone1ISD(e.target.value)} 
             />
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
              onChange={(e) => setbusinessGroupContactPhone2ISD(e.target.value)} 
             />
            {errors && errors.Phone2ISD && <FormFeedback>{errors.Phone2ISD.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Email1' style={{fontSize:'1rem'}}>Email 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Email1'
              name='Email1' 
              innerRef={register({ required: true })} 
              invalid={errors.Email1 && true} 
              onChange={(e) => setbusinessGroupContactEmail1(e.target.value)} 
             />
            {errors && errors.Email1 && <FormFeedback>{errors.Email1.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='Email2' style={{fontSize:'1rem'}}>Email 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='Email2'
              name='Email2' 
              innerRef={register({ required: true })} 
              invalid={errors.Email2 && true} 
              onChange={(e) => setbusinessGroupContactEmail2(e.target.value)} 
             />
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