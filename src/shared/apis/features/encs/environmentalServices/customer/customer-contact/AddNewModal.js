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
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const [customerprimarycontactdeptname, setcustomerPrimaryContactDeptName] = useState("")
  const [customerprimarycontactemail1, setcustomerPrimaryContactEmail1] = useState("")
  const [customerprimarycontactemail2, setcustomerPrimaryContactEmail2] = useState("")
  const [customerprimarycontactfirstname, setcustomerPrimaryContactFirstName] = useState("")
  const [customerprimarycontactlastname, setcustomerPrimaryContactLastName] = useState("")
  const [customerprimarycontactphone1, setcustomerPrimaryContactPhone1] = useState()
  const [customerprimarycontactphone1isd, setcustomerPrimaryContactPhone1ISD] = useState()
  const [customerprimarycontactphone2, setcustomerPrimaryContactPhone2] = useState()
  const [customerprimarycontactphone2isd, setcustomerPrimaryContactPhone2ISD] = useState()
  const [customersecondarycontactdeptname, setcustomerSecondaryContactDeptName] = useState("")
  const [customersecondarycontactemail1, setcustomerSecondaryContactEmail1] = useState("")
  const [customersecondarycontactemail2, setcustomerSecondaryContactEmail2] = useState("")
  const [customersecondarycontactfirstname, setcustomerSecondaryContactFirstName] = useState("")
  const [customersecondarycontactlastname, setcustomerSecondaryContactLastName] = useState("")
  const [customersecondarycontactphone1, setcustomerSecondaryContactPhone1] = useState()
  const [customersecondarycontactphone1isd, setcustomerSecondaryContactPhone1ISD] = useState()
  const [customersecondarycontactphone2, setcustomerSecondaryContactPhone2] = useState()
  const [customersecondarycontactphone2isd, setcustomerSecondaryContactPhone2ISD] = useState()
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

//console.log("Value from dummy = ", dummy)//Dummy printing

    const changeSelectOptionHandlecustomerId = (event) => {
      setcustomerBusinessName(event.target.value)
  
      }
  //-Dropdown selection handler End-
 
   // dummy Token 
   const [token, setToken] = useState(
     localStorage.getItem('token') || ''
   )

  const handlePost = (evt) => {
    console.log()
    console.log('Printing cid in post = ', dummy)
    axios.post(`${process.env.REACT_APP_URL}/api/v1/encs-customer-contact`, {
          customerBusinessName : customerbusinessname,
          customerId : dummy,
          customerPrimaryContactDeptName : customerprimarycontactdeptname,
          customerPrimaryContactEmail1 : customerprimarycontactemail1,
          customerPrimaryContactEmail2 : customerprimarycontactemail2,
          customerPrimaryContactFirstName : customerprimarycontactfirstname,
          customerPrimaryContactLastName : customerprimarycontactlastname,
          customerPrimaryContactPhone1 : customerprimarycontactphone1,
          customerPrimaryContactPhone1ISD : customerprimarycontactphone1isd,
          customerPrimaryContactPhone2 : customerprimarycontactphone2,
          customerPrimaryContactPhone2ISD : customerprimarycontactphone2isd,
          customerSecondaryContactDeptName : customersecondarycontactdeptname,
          customerSecondaryContactEmail1 : customersecondarycontactemail1,
          customerSecondaryContactEmail2 : customersecondarycontactemail2,
          customerSecondaryContactFirstName : customersecondarycontactfirstname,
          customerSecondaryContactLastName : customersecondarycontactlastname,
          customerSecondaryContactPhone1 : customersecondarycontactphone1,
          customerSecondaryContactPhone1ISD : customersecondarycontactphone1isd,
          customerSecondaryContactPhone2 : customersecondarycontactphone2,
          customerSecondaryContactPhone2ISD : customersecondarycontactphone2isd
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
        console.log("Well done! = ", response)
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
    setData(response.data.data)
    })
    .catch((error) => {
      console.error(error)
 })
}, [])
//--Fetching Dropdown ends

  // Validation Part Begins
  const SignupSchema = yup.object().shape({
    PrimaryFirstName: yup.string().min(3).required(),
    PrimaryLastName: yup.string().min(3).required(),
    PrimaryDepartment: yup.string().min(5).required(),
    PrimaryPhone1: yup.number().required().positive().integer(),
    PrimaryPhone2: yup.number().required().positive().integer(),
    PrimaryEmail1: yup.string().email().required(),
    PrimaryEmail2: yup.string().email().required(),
    PrimaryPhone1ISD: yup.number().required().positive().integer(),
    PrimaryPhone2ISD: yup.number().required().positive().integer(),
    SecondaryFirstName: yup.string().min(3).required(),
    SecondaryLastName: yup.string().min(3).required(),
    SecondaryDepartment: yup.string().min(5).required(),
    SecondaryPhone1: yup.number().required().positive().integer(),
    SecondaryPhone2: yup.number().required().positive().integer(),
    SecondaryEmail1: yup.string().email().required(),
    SecondaryEmail2: yup.string().email().required(),
    SecondaryPhone1ISD: yup.number().required().positive().integer(),
    SecondaryPhone2ISD: yup.number().required().positive().integer()
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
        <h5 className='modal-title'style={{color:'black'}}>Customer Contact Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1' onSubmit={handleSubmit(onSubmit)}>
      {/* <FormGroup>
        <Label for='Country' style={{fontSize:'1rem'}}>Customer Business Name</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='select-basic' onChange={changeSelectOptionHandler}>
           <option> Choose Business Name </option>
            {data.map(item => (
              <option
                key={data.customerBusinessName}
                value={data.customerBusinessName}
                
              >
                {item.customerBusinessName}
              </option>
            ))}
        </Input>
        </InputGroup>
        </FormGroup> */}
      {/* <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Contact ID</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName' 
            // innerRef={register({ required: true })} 
            // invalid={errors.OsCategoryName && true}  
            onChange={(e) => setcustomerContactId(e.target.value)} 
            />
            // {errors && errors.OsCategoryName && <FormFeedback>Name must be at least 10 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
 */}

        <FormGroup>
        <Label for='Country' style={{fontSize:'1rem'}}>Customer</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='cid'
            onChange={changeSelectOptionHandlecustomerId}
           >
           <option> Choose Customer Business </option>
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
          <Label for='PrimaryFirstName' style={{fontSize:'1rem'}}>Primary First Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PrimaryFirstName' 
            name='PrimaryFirstName' 
            innerRef={register({ required: true })} 
            invalid={errors.PrimaryFirstName && true}  
            onChange={(e) => setcustomerPrimaryContactFirstName(e.target.value)} 
            />
            {errors && errors.PrimaryFirstName && <FormFeedback>Primary First Name must be at least 3 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='PrimaryLastName' style={{fontSize:'1rem'}}>Primary Last Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PrimaryLastName' 
            name='PrimaryLastName' 
            innerRef={register({ required: true })} 
            invalid={errors.PrimaryLastName && true}  
            onChange={(e) => setcustomerPrimaryContactLastName(e.target.value)} 
            />
            {errors && errors.PrimaryLastName && <FormFeedback>Primary Last Name must be at least 3 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='PrimaryDepartment' style={{fontSize:'1rem'}}>Primary Department</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PrimaryDepartment' 
            name='PrimaryDepartment' 
            innerRef={register({ required: true })} 
            invalid={errors.PrimaryDepartment && true}  
            onChange={(e) => setcustomerPrimaryContactDeptName(e.target.value)} 
            />
            {errors && errors.PrimaryDepartment && <FormFeedback>Primary Department must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='PrimaryPhone1' style={{fontSize:'1rem'}}>Primary Phone 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PrimaryPhone1' 
            name='PrimaryPhone1' 
            innerRef={register({ required: true })} 
            invalid={errors.PrimaryPhone1 && true}  
            onChange={(e) => setcustomerPrimaryContactPhone1(e.target.value)} 
            />
            {errors && errors.PrimaryPhone1 && <FormFeedback>{errors.PrimaryPhone1.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='PrimaryPhone2' style={{fontSize:'1rem'}}>Primary Phone 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PrimaryPhone2' 
            name='PrimaryPhone2' 
            innerRef={register({ required: true })} 
            invalid={errors.PrimaryPhone2 && true}  
            onChange={(e) => setcustomerPrimaryContactPhone2(e.target.value)} 
            />
            {errors && errors.PrimaryPhone2 && <FormFeedback>{errors.PrimaryPhone2.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='PrimaryEmail1' style={{fontSize:'1rem'}}>Primary Email 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PrimaryEmail1' 
            name='PrimaryEmail1' 
            innerRef={register({ required: true })} 
            invalid={errors.PrimaryEmail1 && true}  
            onChange={(e) => setcustomerPrimaryContactEmail1(e.target.value)} 
            />
            {errors && errors.PrimaryEmail1 && <FormFeedback>{errors.PrimaryEmail1.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='PrimaryEmail2' style={{fontSize:'1rem'}}>Primary Email 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PrimaryEmail2' 
            name='PrimaryEmail2' 
            innerRef={register({ required: true })} 
            invalid={errors.PrimaryEmail2 && true}  
            onChange={(e) => setcustomerPrimaryContactEmail2(e.target.value)} 
            />
            {errors && errors.PrimaryEmail2 && <FormFeedback>{errors.PrimaryEmail2.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
      
        <FormGroup>
          <Label for='PrimaryPhone1ISD' style={{fontSize:'1rem'}}>Primary Phone 1 ISD</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PrimaryPhone1ISD' 
            name='PrimaryPhone1ISD' 
            innerRef={register({ required: true })} 
            invalid={errors.PrimaryPhone1ISD && true}  
            onChange={(e) => setcustomerPrimaryContactPhone1ISD(e.target.value)} 
            />
            {errors && errors.PrimaryPhone1ISD && <FormFeedback>{errors.PrimaryPhone1ISD.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
        
        <FormGroup>
          <Label for='PrimaryPhone2ISD' style={{fontSize:'1rem'}}>Primary Phone 2 ISD</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='PrimaryPhone2ISD' 
            name='PrimaryPhone2ISD' 
            innerRef={register({ required: true })} 
            invalid={errors.PrimaryPhone2ISD && true}  
            onChange={(e) => setcustomerPrimaryContactPhone2ISD(e.target.value)} 
            />
            {errors && errors.PrimaryPhone2ISD && <FormFeedback>{errors.PrimaryPhone2ISD.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='SecondaryFirstName' style={{fontSize:'1rem'}}>Secondary First Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='SecondaryFirstName' 
            name='SecondaryFirstName' 
            innerRef={register({ required: true })} 
            invalid={errors.SecondaryFirstName && true}  
            onChange={(e) => setcustomerSecondaryContactFirstName(e.target.value)} 
            />
            {errors && errors.SecondaryFirstName && <FormFeedback>Secondary First Name must be at least 3 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='SecondaryLastName' style={{fontSize:'1rem'}}>Secondary Last Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='SecondaryLastName' 
            name='SecondaryLastName' 
            innerRef={register({ required: true })} 
            invalid={errors.SecondaryLastName && true}  
            onChange={(e) => setcustomerSecondaryContactLastName(e.target.value)} 
            />
            {errors && errors.SecondaryLastName && <FormFeedback>Secondary Last Name must be at least 3 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='SecondaryDepartment' style={{fontSize:'1rem'}}>Secondary Department</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='SecondaryDepartment' 
            name='SecondaryDepartment' 
            innerRef={register({ required: true })} 
            invalid={errors.SecondaryDepartment && true}  
            onChange={(e) => setcustomerSecondaryContactDeptName(e.target.value)} 
            />
            {errors && errors.SecondaryDepartment && <FormFeedback>Secondary Department must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='SecondaryPhone1' style={{fontSize:'1rem'}}>Secondary Phone 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='SecondaryPhone1' 
            name='SecondaryPhone1' 
            innerRef={register({ required: true })} 
            invalid={errors.SecondaryPhone1 && true}  
            onChange={(e) => setcustomerSecondaryContactPhone1(e.target.value)} 
            />
            {errors && errors.SecondaryPhone1 && <FormFeedback>{errors.SecondaryPhone1.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='SecondaryPhone2' style={{fontSize:'1rem'}}>Secondary Phone 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='SecondaryPhone2' 
            name='SecondaryPhone2' 
            innerRef={register({ required: true })} 
            invalid={errors.SecondaryPhone2 && true}  
            onChange={(e) => setcustomerSecondaryContactPhone2(e.target.value)} 
            />
            {errors && errors.SecondaryPhone2 && <FormFeedback>{errors.SecondaryPhone2.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='SecondaryEmail1' style={{fontSize:'1rem'}}>Secondary Email 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='SecondaryEmail1' 
            name='SecondaryEmail1' 
            innerRef={register({ required: true })} 
            invalid={errors.SecondaryEmail1 && true}  
            onChange={(e) => setcustomerSecondaryContactEmail1(e.target.value)} 
            />
            {errors && errors.SecondaryEmail1 && <FormFeedback>{errors.SecondaryEmail1.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='SecondaryEmail2' style={{fontSize:'1rem'}}>Secondary Email 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='SecondaryEmail2' 
            name='SecondaryEmail2' 
            innerRef={register({ required: true })} 
            invalid={errors.SecondaryEmail2 && true}  
            onChange={(e) => setcustomerSecondaryContactEmail2(e.target.value)} 
            />
            {errors && errors.SecondaryEmail2 && <FormFeedback>{errors.SecondaryEmail2.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='SecondaryPhone1ISD' style={{fontSize:'1rem'}}>Secondary Phone 1 ISD</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='SecondaryPhone1ISD' 
            name='SecondaryPhone1ISD' 
            innerRef={register({ required: true })} 
            invalid={errors.SecondaryPhone1ISD && true}  
            onChange={(e) => setcustomerSecondaryContactPhone1ISD(e.target.value)} 
            />
            {errors && errors.SecondaryPhone1ISD && <FormFeedback>{errors.SecondaryPhone1ISD.message}</FormFeedback>}
          </InputGroup>
        </FormGroup>
     
        <FormGroup>
          <Label for='SecondaryPhone2ISD' style={{fontSize:'1rem'}}>Secondary Phone 2 ISD</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='SecondaryPhone2ISD' 
            name='SecondaryPhone2ISD' 
            innerRef={register({ required: true })} 
            invalid={errors.SecondaryPhone2ISD && true}  
            onChange={(e) => setcustomerSecondaryContactPhone2ISD(e.target.value)} 
            />
            {errors && errors.SecondaryPhone2ISD && <FormFeedback>{errors.SecondaryPhone2ISD.message}</FormFeedback>}
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