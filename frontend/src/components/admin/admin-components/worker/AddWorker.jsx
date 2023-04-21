import React from "react";
import { ContainerForAdmin, AddSupplierForm } from "../supplier/AddSupplier";
import styled from "styled-components";
import { useFormik } from "formik";
import { workerSchema } from "../../../../validation/AdminValidation";
const AddWorker = () => {
  const handleSubmitForm = (action, values) => {};

  const handleCancel = (action, values) => {
    action.resetForm();
  };

  const {
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    values,
    handleReset,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
    },
    validationSchema: workerSchema,
    onSubmit: handleSubmitForm,
    handleReset: handleCancel,
  });
  return (
    <ContainerForAdmin>
      <div className="add-supplier-title">
        <h2 className="title-heading">Add Worker</h2>
      </div>
      <AddSupplierForm>
        <div className="name-field field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={values.name}
            onChange={handleChange}
            id="name"
            name="name"
            placeholder="Enter supplier name"
            onBlur={handleBlur}
            className={errors?.name && touched.name ? "input-error" : ""}
          />
        </div>
        <div className="email-field field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            name="email"
            placeholder="Enter supplier email"
            onBlur={handleBlur}
            className={errors?.email && touched.email ? "input-error" : ""}
          />
        </div>
        <div className="mobile-field field">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="text"
            value={values.mobile}
            onChange={handleChange}
            id="mobile"
            name="mobile"
            placeholder="Enter supplier contact number"
            onBlur={handleBlur}
            className={errors?.mobile && touched.mobile ? "input-error" : ""}
          />
        </div>
        <div className="password-field field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            name="password"
            placeholder="Enter a password for worker"
            onBlur={handleBlur}
            className={
              errors?.password && touched.password ? "input-error" : ""
            }
          />
        </div>
        <div className="buttons">
          <button
            onClick={handleSubmit}
            type="submit"
            disabled={isSubmitting}
            className={isSubmitting ? "submitting" : ""}
          >
            Submit
          </button>
          <button type="reset" onClick={handleReset} className="cancel-btn">
            Cancel
          </button>
        </div>
      </AddSupplierForm>
    </ContainerForAdmin>
  );
};

const AddWorkerForm = styled.form``;
export default AddWorker;
