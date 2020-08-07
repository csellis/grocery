import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import { Link, routes } from '@redwoodjs/router'


const StoreForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.store?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          defaultValue={props.store?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="rw-field-error" />

        <div className="rw-button-group">
          <Link className="py-2 px-4 text-white bg-red-700 hover:bg-red-600 focus:bg-red-500 rounded-lg shadow-md" to={routes.stores()}>Cancel</Link>

          <Submit disabled={props.loading} className="py-2 px-4 ml-4 text-white bg-indigo-700 hover:bg-indigo-600 focus:bg-indigo-500 rounded-lg shadow-md">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default StoreForm
