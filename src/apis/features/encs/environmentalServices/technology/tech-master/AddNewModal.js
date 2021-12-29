// ** React Imports
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// ** Third Party Components
import { X, Command, Database, Clipboard, Plus} from 'react-feather'
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
  FormFeedback,
  Alert
} from 'reactstrap'

const AddNewModal = (props) => {

  // Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={props.handleModal} />
  // Hooks variable to handle input fields
  const [isctechcategorydescription, setIscTechCategoryDescription] = useState("")
  const [isctechcategoryname, setIscTechCategoryName] = useState("")
  const [isctechcategorytags, setIscTechCategoryTags] = useState("")
  //handlePost
  const handlePost = (e) => {
    props.postRequest(isctechcategorydescription, isctechcategoryname, isctechcategorytags)
  }
  // Validation Part Begins here
  const SignupSchema = yup.object().shape({
    TechCategoryName: yup.string().min(5).required(),
    TechCategorytag: yup.string().min(10).required(),
    setIscTechCategoryDescription: yup.string().max(500).required()
  })
  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
  // Validation Part Ends

  return (
    <Modal
      isOpen={props.open}
      toggle={props.handleModal}
      className='sidebar-sm'
      // modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={props.handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title' style={{ color: 'black' }}>New Technology Category</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <FormGroup>
          <Label for='TechCategoryName' style={{ fontSize: '1rem' }} style={{ fontSize: '1rem' }}>Technology Category Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Database size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='TechCategoryName' name='TechCategoryName' innerRef={register({ required: true })} invalid={errors.TechCategoryName && true} placeholder='' onChange={(e) => setIscTechCategoryName(e.target.value)} />
            {errors && errors.TechCategoryName && <FormFeedback>Name must be at least 5 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='TechCategorytag' style={{ fontSize: '1rem' }}>Technology Category Tags</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Command size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='text' id='TechCategorytag' name='TechCategorytag' innerRef={register({ required: true })} invalid={errors.TechCategorytag && true} placeholder='' onChange={(e) => setIscTechCategoryTags(e.target.value)} />
            {errors && errors.TechCategorytag && <FormFeedback>Tag must be at least 10 characters</FormFeedback>}
          </InputGroup>
        </FormGroup>
        
        <FormGroup>
          <Label for='setIscTechCategoryDescription' style={{ fontSize: '1rem' }}>Description</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Clipboard size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='textarea' id='setIscTechCategoryDescription' rows='3' name='setIscTechCategoryDescription' innerRef={register({ required: true })} invalid={errors.setIscTechCategoryDescription && true} onChange={(e) => setIscTechCategoryDescription(e.target.value)} />
            {errors && errors.setIscTechCategoryDescription && <FormFeedback>Maximum 500 characters are allowed</FormFeedback>}
          </InputGroup>
        </FormGroup>
        <Button className='mr-1' disabled={isctechcategoryname.length < 1} color='primary' onClick={(e) => {
          handlePost()
          props.handleModal()
        }
        }>
          Submit
        </Button>
        <Button color='secondary' onClick={props.handleModal} outline>
          Cancel
        </Button>
        {/* Handle error when pk is null */}
        {

          (!isctechcategoryname.length) ? <Alert color='danger' className="mt-1">
            <div className='alert-body'>
              Please fill the required details.
            </div>
          </Alert> : ''
        }
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal