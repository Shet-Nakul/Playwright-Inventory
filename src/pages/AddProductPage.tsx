import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { productCategories, suppliers } from '../data/mockData'
import { useToast } from '../context/ToastContext'
import type { NewProductInput } from '../types'

type Errors = Partial<Record<keyof NewProductInput, string>>

const emptyForm: NewProductInput = {
  name: '',
  sku: '',
  category: '',
  quantity: 0,
  price: 0,
  supplier: '',
  description: '',
  acceptTerms: false,
  notify: false,
}

export default function AddProductPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [form, setForm] = useState<NewProductInput>(emptyForm)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  function update<K extends keyof NewProductInput>(key: K, value: NewProductInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function validate(values: NewProductInput): Errors {
    const next: Errors = {}
    if (!values.name.trim()) next.name = 'Product name is required.'
    else if (values.name.trim().length < 3) next.name = 'Name must be at least 3 characters.'

    if (!values.sku.trim()) next.sku = 'SKU is required.'
    else if (!/^[A-Z]{3}-\d{4}$/.test(values.sku.trim()))
      next.sku = 'SKU must match the format ABC-1234.'

    if (!values.category) next.category = 'Please select a category.'
    if (!values.supplier) next.supplier = 'Please select a supplier.'

    if (values.quantity < 0) next.quantity = 'Quantity cannot be negative.'
    if (values.price <= 0) next.price = 'Price must be greater than 0.'

    if (!values.acceptTerms) next.acceptTerms = 'You must accept the terms.'
    return next
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      showToast('Please fix the errors in the form.', 'error')
      return
    }
    setSubmitted(true)
    showToast(`Product "${form.name}" added successfully!`, 'success')
    window.setTimeout(() => navigate('/products'), 1200)
  }

  function handleReset() {
    setForm(emptyForm)
    setErrors({})
    setSubmitted(false)
  }

  return (
    <div data-testid="add-product-page">
      <PageHeader title="Add Product" subtitle="Create a new inventory item" />

      {submitted && (
        <div className="alert alert-success" data-testid="form-success" role="status">
          Product saved. Redirecting to product list…
        </div>
      )}

      <form className="form-grid panel" data-testid="add-product-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label className="field-label" htmlFor="name">
            Product Name <span className="required">*</span>
          </label>
          <input
            id="name"
            type="text"
            data-testid="input-name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
          />
          {errors.name && (
            <span className="field-error" data-testid="error-name">
              {errors.name}
            </span>
          )}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="sku">
            SKU <span className="required">*</span>
          </label>
          <input
            id="sku"
            type="text"
            placeholder="ABC-1234"
            data-testid="input-sku"
            value={form.sku}
            onChange={(e) => update('sku', e.target.value.toUpperCase())}
          />
          {errors.sku && (
            <span className="field-error" data-testid="error-sku">
              {errors.sku}
            </span>
          )}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="category">
            Category <span className="required">*</span>
          </label>
          <select
            id="category"
            data-testid="select-category"
            value={form.category}
            onChange={(e) => update('category', e.target.value as NewProductInput['category'])}
          >
            <option value="">— Select category —</option>
            {productCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="field-error" data-testid="error-category">
              {errors.category}
            </span>
          )}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="supplier">
            Supplier <span className="required">*</span>
          </label>
          <select
            id="supplier"
            data-testid="select-supplier"
            value={form.supplier}
            onChange={(e) => update('supplier', e.target.value)}
          >
            <option value="">— Select supplier —</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.supplier && (
            <span className="field-error" data-testid="error-supplier">
              {errors.supplier}
            </span>
          )}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="quantity">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min={0}
            data-testid="input-quantity"
            value={form.quantity}
            onChange={(e) => update('quantity', Number(e.target.value))}
          />
          {errors.quantity && (
            <span className="field-error" data-testid="error-quantity">
              {errors.quantity}
            </span>
          )}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="price">
            Price (USD) <span className="required">*</span>
          </label>
          <input
            id="price"
            type="number"
            min={0}
            step="0.01"
            data-testid="input-price"
            value={form.price}
            onChange={(e) => update('price', Number(e.target.value))}
          />
          {errors.price && (
            <span className="field-error" data-testid="error-price">
              {errors.price}
            </span>
          )}
        </div>

        <div className="field field-full">
          <label className="field-label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            data-testid="input-description"
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
          />
        </div>

        <fieldset className="field field-full radio-group" data-testid="restock-group">
          <legend className="field-label">Restock preference</legend>
          <label className="radio">
            <input
              type="radio"
              name="notify"
              data-testid="radio-notify-yes"
              checked={form.notify === true}
              onChange={() => update('notify', true)}
            />
            Notify me when low
          </label>
          <label className="radio">
            <input
              type="radio"
              name="notify"
              data-testid="radio-notify-no"
              checked={form.notify === false}
              onChange={() => update('notify', false)}
            />
            Do not notify
          </label>
        </fieldset>

        <div className="field field-full">
          <label className="checkbox">
            <input
              type="checkbox"
              data-testid="checkbox-terms"
              checked={form.acceptTerms}
              onChange={(e) => update('acceptTerms', e.target.checked)}
            />
            I confirm the product details are accurate. <span className="required">*</span>
          </label>
          {errors.acceptTerms && (
            <span className="field-error" data-testid="error-acceptTerms">
              {errors.acceptTerms}
            </span>
          )}
        </div>

        <div className="form-actions field-full">
          <button type="button" className="btn btn-ghost" data-testid="reset-form" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" className="btn btn-primary" data-testid="submit-product">
            Save Product
          </button>
        </div>
      </form>
    </div>
  )
}
