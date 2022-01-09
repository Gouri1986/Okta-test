// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X, Cpu, Layers, Database } from 'react-feather'
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

const UpdateModal = ({ open, handleUpdateModal, value, fetchData }) => {
  // ** State
  
    // dummy Token 
    const [token, setToken] = useState(
      localStorage.getItem('token') || ''
    )
  const [Picker, setPicker] = useState(new Date())
  const [data, setData] = useState([])
  const [datatwo, setDataTwo] = useState([])
  const [datathree, setDataThree] = useState([])
  const [datafour, setDataFour] = useState([])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [assetModelDesc, setassetModelDesc] = useState("")
  const [assetModel, setassetModelId] = useState("")
  const [assetType, setassetType] = useState("")
  const [assetTypeId, setassetTypeId] = useState("")
  const [assetVendor, setassetVendor] = useState("")
  const [assetVendorId, setassetVendorId] = useState("")
  const [suppliername, setSupplierName] = useState("")
  const [idSupplier, setidSupplier] = useState("")
  const [customerbusinessname, setCustomerBusinessNames] = useState('')
  const [customerid, setCustomerId] = useState('')
  const [pk, setPk] = useState('')

 //-Dropdown selection handler-
    
 const index = data.findIndex(obj => obj.customerBusinessName === customerbusinessname)
 console.log("Index value Business= ", index)

 useEffect(() => {
   try { //This try is solve the Type undifined error
     setCustomerId(data[index].customerId)
   } catch (error) {
     console.log('Spec', error)
   }
 })
 console.log('customerid = ', customerid)

  const changeSelectOptionHandlerCustomerBusinessName = (event) => {
   setCustomerBusinessNames(event.target.value)
  }
 //-Dropdown selection handler End-

  //-Dropdown selection handler-
    
  const index2 = datatwo.findIndex(obj => obj.supplierName === suppliername)
  console.log("Index value idSupplier= ", index2)
 
  useEffect(() => {
    try { //This try is solve the Type undifined error
      setidSupplier(datatwo[index2].supplierId)
    } catch (error) {
      console.log('Spec', error)
    }
  })
  console.log('idSupplier = ', idSupplier)
 
   const changeSelectOptionHandlerSupplier = (event) => {
    setSupplierName(event.target.value)
   }
  //-Dropdown selection handler End-

  //-Dropdown selection handler-
    
  const index3 = datathree.findIndex(obj => obj.dcAssetVendorName === assetVendor)
  console.log("Index value Business= ", index3)
 
  useEffect(() => {
    try { //This try is solve the Type undifined error
      setassetVendorId(datathree[index3].dcAssetVendorId)
    } catch (error) {
      console.log('Spec', error)
    }
  })
  console.log('assetVendorId = ', assetVendorId)
 
   const changeSelectOptionHandlerVendor = (event) => {
    setassetVendor(event.target.value)
   }
  //-Dropdown selection handler End-

//-Dropdown selection handler-
    
const index4 = datafour.findIndex(obj => obj.dcAssetTypeName === assetType)
console.log("Index value Business= ", index4)

useEffect(() => {
  try { //This try is solve the Type undifined error
    setassetTypeId(datafour[index4].dcAssestTypeId)
  } catch (error) {
    console.log('Spec', error)
  }
})
console.log('assetTypeId = ', assetTypeId)

 const changeSelectOptionHandlerAssetType = (event) => {
  setassetType(event.target.value)
 }
//-Dropdown selection handler End-
  
 //-Update Method

  useEffect(() => {
    setPk(value.dcAssetModelId)
    setassetModelId(value.dcAssetModelName)
    setassetModelDesc(value.dcAssetModelDesc)
    setassetType(value.dcAssetTypeName)
    setassetVendor(value.dcAssetVendorName)
    setSupplierName(value.supplierName)
    setCustomerBusinessNames(value.customerBusinessName)
 }, [value])

  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-dc-asset-model-master`, {
          dcAssetModelId : pk,
          customerBusinessName : customerbusinessname,
          customerId : customerid,
          dcAssetModelDesc : assetModelDesc,
          dcAssetModelName : assetModel,
          dcAssetTypeId : assetTypeId,
          dcAssetTypeName : assetType,
          dcAssetVendorId : assetVendorId,
          dcAssetVendorName : assetVendor,
          supplierId : idSupplier,
          supplierName : suppliername
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
        console.log(response)
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
      .catch((error, response) => {
        // Handle error.
        console.log("An error occurred:", error)
        console.log(response)

      })
  }
//-Update Method End

  //--Fetching Dropdown Api 1
  
  useEffect(() => { 
    // if (isLoaded === false) {
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-customer`
      
    )
    .then((response) => {
      // Handle success.
      console.log("Connection established.Data is fetching from list!")
      setData(response.data.data)
      console.log(response.data.data)
      })
      .catch((error) => {
        console.error(error)
   })
  }, []) 
 //--Fetching Dropdown

  //--Fetching Dropdown Api 2
  
  useEffect(() => { 
    // if (isLoaded === false) {
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-supplierNames`
      
    )
    .then((response) => {
      // Handle success.
      console.log("Connection established.Data is fetching from list!")
      setDataTwo(response.data.data)
      console.log(response.data.data)
      })
      .catch((error) => {
        console.error(error)
   })
  }, []) 
 //--Fetching Dropdown
  //--Fetching Dropdown Api 3
  
  useEffect(() => { 
    // if (isLoaded === false) {
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-vendorNames`
      
    )
    .then((response) => {
      // Handle success.
      console.log("Connection established.Data is fetching from list!")
      setDataThree(response.data.data)
      console.log(response.data.data)
      })
      .catch((error) => {
        console.error(error)
   })
  }, []) 
 //--Fetching Dropdown
 //--Fetching Dropdown Api 4
  
 useEffect(() => { 
  // if (isLoaded === false) {
    axios.get(`${process.env.REACT_APP_URL}/api/v1/list-AssestTypeNames`
    
  )
  .then((response) => {
    // Handle success.
    console.log("Connection established.Data is fetching from list!")
    setDataFour(response.data.data)
    console.log(response.data.data)
    })
    .catch((error) => {
      console.error(error)
 })
}, []) 
//--Fetching Dropdown

return (
    <Modal
      isOpen={open}
      toggle={handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'style={{color:'black'}}>Update DC Asset Model Master</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <FormGroup>
          <Label for='dcassetmodelname' style={{fontSize:'1rem'}}>DC Asset Model Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='dcassetmodelname' name='dcassetmodelname' 
            value={assetModel}
            onChange={(e) => setassetModelId(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
        <Label for='Supplier' style={{fontSize:'1rem'}}>Supplier</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Supplier'
          value={suppliername}
          onChange={changeSelectOptionHandlerSupplier}>
             <option disabled hidden selected> Choose Customer </option>
            {datatwo.map(item => (
              <option
                key={datatwo.supplierName}
                value={datatwo.supplierName}
                
              >
                {item.supplierName}
              </option>
            ))}
        </Input>
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
          <Input type='select' name='select' id='Customer'
          value={customerbusinessname}
          onChange={changeSelectOptionHandlerCustomerBusinessName}>
             <option disabled hidden selected> Choose Customer </option>
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
        <Label for='dcassetvendor' style={{fontSize:'1rem'}}>DC Asset Vender</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='dcassetvendor' 
          value={assetVendor}
          onChange={changeSelectOptionHandlerVendor}>
             <option disabled hidden selected> Choose DC Asset Vender </option>
            {datathree.map(item => (
              <option
                key={datathree.dcAssetVendorName}
                value={datathree.dcAssetVendorName}
                
              >
                {item.dcAssetVendorName}
              </option>
            ))}
        </Input>
        </InputGroup>
        </FormGroup>
      
        <FormGroup>
          <Label for='modeldescription' style={{fontSize:'1rem'}}>Model Description</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type='textarea' row='3' id='modeldescription'
             name='modeldescription' 
            value={assetModelDesc}
            onChange={(e) => setassetModelDesc(e.target.value)}/>
          </InputGroup>
        </FormGroup>
        
        <FormGroup>
        <Label for='dcassettype' style={{fontSize:'1rem'}}>DC Asset Type</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='dcassettype'
          value={assetType}
          onChange={changeSelectOptionHandlerAssetType}>
             <option disabled hidden selected> Choose DC Asset Type </option>
            {datafour.map(item => (
              <option
                key={datafour.dcAssestTypeName}
                value={datafour.dcAssestTypeName}
                
              >
                {item.dcAssestTypeName}
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
