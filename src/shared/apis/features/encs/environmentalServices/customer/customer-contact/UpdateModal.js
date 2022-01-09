// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Database,  DollarSign, X, Cpu, Layers, Command } from 'react-feather'
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

import handleSuccess from '@components/alerts/Success'
import handleError from '@components/alerts/Error'

const UpdateModal = ({ open, handleUpdateModal, value, fetchData}) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())

   // dummy Token 
   const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  const [data, setData] = useState([])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [customerprimarycontactdeptname, setcustomerPrimaryContactDeptName] = useState("")
  const [customerprimarycontactemail1, setcustomerPrimaryContactEmail1] = useState("")
  const [customerprimarycontactemail2, setcustomerPrimaryContactEmail2] = useState("")
  const [customerprimarycontactfirstname, setcustomerPrimaryContactFirstName] = useState("")
  const [customerprimarycontactlastname, setcustomerPrimaryContactLastName] = useState("")
  const [customerprimarycontactphone1, setcustomerPrimaryContactPhone1] = useState("")
  const [customerprimarycontactphone1isd, setcustomerPrimaryContactPhone1ISD] = useState("")
  const [customerprimarycontactphone2, setcustomerPrimaryContactPhone2] = useState("")
  const [customerprimarycontactphone2isd, setcustomerPrimaryContactPhone2ISD] = useState("")
  const [customersecondarycontactdeptname, setcustomerSecondaryContactDeptName] = useState("")
  const [customersecondarycontactemail1, setcustomerSecondaryContactEmail1] = useState("")
  const [customersecondarycontactemail2, setcustomerSecondaryContactEmail2] = useState("")
  const [customersecondarycontactfirstname, setcustomerSecondaryContactFirstName] = useState("")
  const [customersecondarycontactlastname, setcustomerSecondaryContactLastName] = useState("")
  const [customersecondarycontactphone1, setcustomerSecondaryContactPhone1] = useState("")
  const [customersecondarycontactphone1isd, setcustomerSecondaryContactPhone1ISD] = useState("")
  const [customersecondarycontactphone2, setcustomerSecondaryContactPhone2] = useState("")
  const [customersecondarycontactphone2isd, setcustomerSecondaryContactPhone2ISD] = useState("")
 
  // Printing the Customer contact(primary key)
  console.log("Primary key :", value.customerContactId)
  
  //PK Hook 
  const [pk, setPk] = useState('')

  //  Printing primary key value in pk
  console.log("PK=", pk)

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
   console.log(dummy)
  //console.log("Value from dummy = ", dummy)//Dummy printing

   const changeSelectOptionHandlecustomerId = (event) => {
     setcustomerBusinessName(event.target.value)
 
     }
  //-
  //-Update Method
  useEffect(() => {
   })
  useEffect(() => {
  setPk(value.customerContactId)
  setcustomerBusinessName(value.customerBusinessName)
  setcustomerPrimaryContactDeptName(value.customerPrimaryContactDeptName)
  setcustomerPrimaryContactEmail1(value.customerPrimaryContactEmail1)
  setcustomerPrimaryContactEmail2(value.customerPrimaryContactEmail2)
  setcustomerPrimaryContactFirstName(value.customerPrimaryContactFirstName)
  setcustomerPrimaryContactLastName(value.customerPrimaryContactLastName)
  setcustomerPrimaryContactPhone1(value.customerPrimaryContactPhone1)
  setcustomerPrimaryContactPhone1ISD(value.customerPrimaryContactPhone1ISD)
  setcustomerPrimaryContactPhone2(value.customerPrimaryContactPhone2)
  setcustomerPrimaryContactPhone2ISD(value.customerPrimaryContactPhone2ISD)
  setcustomerSecondaryContactDeptName(value.customerSecondaryContactDeptName)
  setcustomerSecondaryContactEmail1(value.customerSecondaryContactEmail1)
  setcustomerSecondaryContactEmail2(value.customerSecondaryContactEmail2)
  setcustomerSecondaryContactFirstName(value.customerSecondaryContactFirstName)
  setcustomerSecondaryContactLastName(value.customerSecondaryContactLastName)
  setcustomerSecondaryContactPhone1(value.customerSecondaryContactPhone1)
  setcustomerSecondaryContactPhone1ISD(value.customerSecondaryContactPhone1ISD)
  setcustomerSecondaryContactPhone2(value.customerSecondaryContactPhone2)
  setcustomerSecondaryContactPhone2ISD(value.customerSecondaryContactPhone2ISD)
 }, [value])

  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-customer-contact`, {
      customerContactId:pk,
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
        console.log("Well done!")
        if (response.data.message === "An unexpected internal application error has occurred. Please Contact System Administrator") {
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
//-Update Method End
  //--Fetching Dropdown

  useEffect(() => { 
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-customer`
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
  
return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>Customer Contact Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <FormGroup>
        <Label for='Country' style={{fontSize:'1rem'}}>Customer</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='select-customerBusinessName'
          value={customerbusinessname}
          onChange={changeSelectOptionHandlecustomerId}>
           <option> Choose Customer </option>
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
        </FormGroup>
        <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Primary First Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName'
            value={customerprimarycontactfirstname}   
            onChange={(e) => setcustomerPrimaryContactFirstName(e.target.value)} 
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Primary Last Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName'
            value={customerprimarycontactlastname}   
            onChange={(e) => setcustomerPrimaryContactLastName(e.target.value)} 
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Primary Department</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName'
            value={customerprimarycontactdeptname}   
            onChange={(e) => setcustomerPrimaryContactDeptName(e.target.value)} 
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Primary Phone 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName' 
            value={customerprimarycontactphone1}  
            onChange={(e) => setcustomerPrimaryContactPhone1(e.target.value)} 
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Primary Phone 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName' 
            value={customerprimarycontactphone2}    
            onChange={(e) => setcustomerPrimaryContactPhone2(e.target.value)} 
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Primary Email 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName'
            value={customerprimarycontactemail1}  
            onChange={(e) => setcustomerPrimaryContactEmail1(e.target.value)} 
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Primary Email 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName' 
            value={customerprimarycontactemail2}  
            onChange={(e) => setcustomerPrimaryContactEmail2(e.target.value)} 
            />
          </InputGroup>
        </FormGroup>
      
        <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Primary Phone 1 ISD</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName'
            value={customerprimarycontactphone1isd}   
            onChange={(e) => setcustomerPrimaryContactPhone1ISD(e.target.value)} 
            />
          </InputGroup>
        </FormGroup>
        
        <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Primary Phone 2 ISD</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName'
            value={customerprimarycontactphone2isd}      
            onChange={(e) => setcustomerPrimaryContactPhone2ISD(e.target.value)} 
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Secondary First Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName'
            value={customersecondarycontactfirstname}   
            onChange={(e) => setcustomerSecondaryContactFirstName(e.target.value)} 
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Secondary Last Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName'
            value={customersecondarycontactlastname}
            onChange={(e) => setcustomerSecondaryContactLastName(e.target.value)} 
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Secondary Department</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName'
            value={customersecondarycontactdeptname}   
            onChange={(e) => setcustomerSecondaryContactDeptName(e.target.value)} 
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Secondary Phone 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName'
            value={customersecondarycontactphone1}  
            onChange={(e) => setcustomerPrimaryContactPhone1(e.target.value)} 
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Secondary Phone 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName'
            value={customersecondarycontactphone2}   
            onChange={(e) => setcustomerSecondaryContactPhone2(e.target.value)} 
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Secondary Email 1</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName'
            value={customersecondarycontactemail1}   
            onChange={(e) => setcustomerSecondaryContactEmail1(e.target.value)} 
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Secondary Email 2</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName'
            value={customersecondarycontactemail2}   
            onChange={(e) => setcustomerSecondaryContactEmail2(e.target.value)} 
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Secondary Phone 1 ISD</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName'
            value={customersecondarycontactphone1isd}   
            onChange={(e) => setcustomerSecondaryContactPhone1ISD(e.target.value)} 
            />
          </InputGroup>
        </FormGroup>
     
        <FormGroup>
          <Label for='OsCategoryName' style={{fontSize:'1rem'}}>Secondary Phone 2 ISD</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='OsCategoryName' 
            name='OsCategoryName'
            value={customersecondarycontactphone2isd}
            onChange={(e) => setcustomerSecondaryContactPhone2ISD(e.target.value)} 
            />
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
