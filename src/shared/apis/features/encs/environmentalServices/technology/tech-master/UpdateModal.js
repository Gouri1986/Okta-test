// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import { User, Briefcase, X } from 'react-feather'
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
const UpdateModal = (props) => {
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={props.handleUpdateModal} />
  // Hooks variable to handle input fields
  const [isctechcategoryname, setIscTechCategoryName] = useState("")
  const [isctechcategorydescription, setIscTechCategoryDescription] = useState("")
  const [isctechcategorytags, setIscTechCategoryTags] = useState("")

  useEffect(() => {
    setIscTechCategoryName(props.value.iscTechCategoryName)
  })
  useEffect(() => {
    setIscTechCategoryDescription(props.value.iscTechCategoryDescription)
    setIscTechCategoryTags(props.value.iscTechCategoryTags)
  }, [props.value])

  //Handle Post
  const handlePost = (e) => {
    props.putRequest(isctechcategorydescription, isctechcategoryname, isctechcategorytags)
  }

  return (
    <Modal
      isOpen={props.open}
      toggle={props.handleUpdateModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={props.handleUpdateModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title' style={{ color: 'black' }}>Update Technology Categoryr</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <FormGroup>
          <Label for='isctechcategoryname' style={{ fontSize: '1rem' }}> Technology Category Name*</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='isctechcategoryname'
              value={isctechcategoryname}
              onChange={(e) => {
                setIscTechCategoryName(e.target.value)
              }} />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='isctechcategorytags' style={{ fontSize: '1rem' }}>Technology Category Tags</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='isctechcategorytags'
              value={isctechcategorytags}
              onChange={(e) => setIscTechCategoryTags(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='isctechcategorydescription' style={{ fontSize: '1rem' }}> Description</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='isctechcategorydescription'
              value={isctechcategorydescription}
              onChange={(e) => setIscTechCategoryDescription(e.target.value)} />
          </InputGroup>
        </FormGroup>
        <Button className='mr-1' color='primary'
          onClick={(e) => {
            handlePost()
            props.handleUpdateModal()
          }}>
          Submit
        </Button>
        <Button color='secondary' onClick={props.handleUpdateModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default UpdateModal
