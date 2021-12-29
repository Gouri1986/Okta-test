// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Database, Calendar, DollarSign, X, Cpu, Layers, Command } from 'react-feather'
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

const UpdateModal = ({ open, handleUpdateModal, value, fetchData}) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())

  // dummy Token 
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleUpdateModal} />
  const [data, setData] = useState([])
  const [datatwo, setDataTwo] = useState([])
  const [datathree, setDataThree] = useState([])
  const [assetid, setAssetId] = useState([])
  const [dcassetname, setDCAssetName] = useState("")

  const [dcassetmodelname, setDCAssetModelName] = useState("")
  const [dcassetid, setdcAssetId] = useState([])

  const index = data.findIndex(obj => obj.dcAssetModelName === dcassetmodelname)
  console.log("Index value Business= ", index)
 
  useEffect(() => {
    try { //This try is solve the Type undifined error
      setDCAssetId(data[index].dcAssetModelId)
    } catch (error) {
      console.log('Spec', error)
    }
  })
  console.log('dcAssetModelId = ', dcassetid)

  const changeSelectOptionHandlerAssetName = (event) => {
    setDCAssetModelName(event.target.value)
   }

   const [Vendorname, setVendorname] = useState("")
   const [customerid, setVendorid] = useState("")

   const index2 = datatwo.findIndex(obj => obj.customerBusinessName === Vendorname)
   console.log("Index value Business= ", index2)
  
   useEffect(() => {
     try { //This try is solve the Type undifined error
      setVendorid(datatwo[index2].customerId)
     } catch (error) {
       console.log('Spec', error)
     }
   })
   console.log('Cid = ', customerid)

   const changeSelectOptionHandlerVendor = (event) => {
    setVendorname(event.target.value)
   }

   const [suppliername, setsuppliername] = useState("")
   const [supplierid, setsupplierid] = useState("")

   const index3 = datathree.findIndex(obj => obj.supplierName === suppliername)
   console.log("Index value Business= ", index3)
  
   useEffect(() => {
     try { //This try is solve the Type undifined error
      setsupplierid(datathree[index3].supplierId)
     } catch (error) {
       console.log('Spec', error)
     }
   })
   console.log('supplierId = ', supplierid)

   const changeSelectOptionHandlerSupplier = (event) => {
    setsuppliername(event.target.value)
   }

  useEffect(() => {
    setdcAssetId(value.dcAssetId)
   })
  useEffect(() => {
    setAssetId(value.dcAssetModelId)
    setDCAssetName(value.dcAssetName)
    setDCAssetModelName(value.dcAssetModelName)
    setVendorname(value.customerBusinessName)
    setsuppliername(value.supplierName)
 }, [value])

  const handlePost = (evt) => {
    axios.put(`${process.env.REACT_APP_URL}/api/v1/encs-dc-asset`, {
          dcAssetId:dcassetid, //pk
          customerBusinessName : Vendorname,
          customerId: customerid,
          dcAssetModelId : assetid,
          dcAssetModelName : dcassetmodelname,
          dcAssetName : dcassetname,
          supplierId : supplierid,
          supplierName :suppliername
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

   //--Fetching Dropdown Api 1
  
   useEffect(() => { 
    // if (isLoaded === false) {
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-AssetModelNames`
      
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
      axios.get(`${process.env.REACT_APP_URL}/api/v1/list-customer`
      
    )
    .then((response) => {
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
  axios.get(`${process.env.REACT_APP_URL}/api/v1/list-supplierNames`
  
)
.then((response) => {
  console.log("Connection established.Data is fetching from list!")
  setDataThree(response.data.data)
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
        <h5 className='modal-title'style={{color:'black'}}>Update DC Assset</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
      <FormGroup>
          <Label for='DCAssetName' style={{fontSize:'1rem'}}>DC Asset Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='DCAssetName' name='DCAssetName'
            value={dcassetname}
            onChange={(e) => setDCAssetName(e.target.value)} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
        <Label for='Assetmodel' style={{fontSize:'1rem'}}>Asset Model Names</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='Assetmodel'
          value={dcassetmodelname}
          onChange={changeSelectOptionHandlerAssetName}>
            <option disabled hidden selected> Asset Model Names </option>
            {data.map(item => (
              <option
                key={data.dcAssetModelName}
                value={data.dcAssetModelName}
                
              >
                {item.dcAssetModelName}
              </option>
            ))}
        </Input>
        </InputGroup>
        </FormGroup>

        <FormGroup>
        <Label for='customerBusinessName' style={{fontSize:'1rem'}}>Customer Name</Label>
        <InputGroup>
        <InputGroupAddon addonType='prepend'>
              <InputGroupText>
              <Layers size={15}/>
              </InputGroupText>
            </InputGroupAddon>
          <Input type='select' name='select' id='customerBusinessName'
          value={Vendorname}
          onChange={changeSelectOptionHandlerVendor}>
            <option disabled hidden selected> Customer Names </option>
            {datatwo.map(item => (
              <option
                key={datatwo.customerBusinessName}
                value={datatwo.customerBusinessName}
                
              >
                {item.customerBusinessName}
              </option>
            ))}
        </Input>
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
            <option disabled hidden selected> Supplier </option>
            {datathree.map(item => (
              <option
                key={datathree.supplierName}
                value={datathree.supplierName}
                
              >
                {item.supplierName}
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
