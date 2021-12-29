// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import {Database, X, Layers, Command } from 'react-feather'
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
  const [datatwo, setDataTwo] = useState([])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
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
  const [pk, setPk] = useState('')
  const [dummy, setDummy] = useState([])
  
   //-Dropdown selection handler-
   const [customerbusinessname, setcustomerBusinessName] = useState('')
   
    // Variale to store the index value of selected option
    const index = data.findIndex(obj => obj.customerBusinessName === customerbusinessname)
    console.log("Index value = ", index)// Printing the index value of selected option

    useEffect(() => {
      try { //This try is solve the Type undifined error
        setDummy(data[index].customerId)
      } catch (error) {
        console.log('Spec', error)
      }
    })
    console.log(dummy)
    console.log('pk = ', pk)
    //
    
    const changeSelectOptionHandlecustomerId = (event) => {
      setcustomerBusinessName(event.target.value)
    }
      
    
     //-Dropdown selection handler-
   const [businessgroupname, setbusinessGroupName] = useState('')
 
  //-Update Method
    useEffect(() => {
    })
    useEffect(() => {
      setPk(value.businessGroupId)
      setcustomerBusinessName(value.customerBusinessName)
      setbusinessGroupName(value.businessGroupName)
      setbusinessGroupDescription(value.businessGroupDescription)
      setbusinessGroupContactFirstName(value.businessGroupContactFirstName)
      setbusinessGroupContactLastName(value.businessGroupContactLastName)
      setbusinessGroupContactDeptName(value.businessGroupContactDeptName)
      setbusinessGroupContactPhone1(value.businessGroupContactPhone1)
      setbusinessGroupContactPhone2(value.businessGroupContactPhone2)
      setbusinessGroupContactPhone1ISD(value.businessGroupContactPhone1ISD)
      setbusinessGroupContactPhone2ISD(value.businessGroupContactPhone2ISD)
      setbusinessGroupContactEmail1(value.businessGroupContactEmail1)
      setbusinessGroupContactEmail2(value.businessGroupContactEmail2)
    }, [value])

  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-business-group-details`, {
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
      customerId : dummy,
      businessGroupId : pk
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
  
return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>Update Business Group Details</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
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
              value={businessgroupname} 
              onChange={(e) => setbusinessGroupName(e.target.value)} 
             />
          </InputGroup>
        </FormGroup>
      <FormGroup>
        <Label for='Country' style={{fontSize:'1rem'}}>Customer</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='cid'
          value={customerbusinessname}
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
              name='Description'
              value={businessgroupdescription}
              onChange={(e) => setbusinessGroupDescription(e.target.value)} 
             />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='FisrtName' style={{fontSize:'1rem'}}>Fisrt Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='FisrtName'
              name='FisrtName'
              value={businessgroupcontactfirstname} 
              onChange={(e) => setbusinessGroupContactFirstName(e.target.value)} 
             />
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
              value={businessgroupcontactlasttname} 
              onChange={(e) => setbusinessGroupContactLastName(e.target.value)} 
             />
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
              value={businessgroupcontactdeptname} 
              onChange={(e) => setbusinessGroupContactDeptName(e.target.value)} 
             />
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
              value={businessgroupcontactphone1} 
              onChange={(e) => setbusinessGroupContactPhone1(e.target.value)} 
             />
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
              value={businessgroupcontactphone2} 
              onChange={(e) => setbusinessGroupContactPhone2(e.target.value)} 
             />
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
              value={businessgroupcontactphone1isd} 
              onChange={(e) => setbusinessGroupContactPhone1ISD(e.target.value)} 
             />
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
              value={businessgroupcontactphone2isd} 
              onChange={(e) => setbusinessGroupContactPhone2ISD(e.target.value)} 
             />
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
              value={businessgroupcontactemail1} 
              onChange={(e) => setbusinessGroupContactEmail1(e.target.value)} 
             />
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
              value={businessgroupcontactemail2} 
              onChange={(e) => setbusinessGroupContactEmail2(e.target.value)} 
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
