import React from "react";
import { useFormik } from "formik";
import styled from "styled-components";
import { supplierSchema } from "../../../../validation/AdminValidation";
import { createSupplier } from "../../../../api/Admin";
import { useToast } from "@chakra-ui/react";
const AddSupplier = () => {
  const toast = useToast();
  const handleSubmitForm = async (values, action) => {
    try {
      const data = await createSupplier(values);
      toast({
        title: data?.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      action.resetForm();
    }
  };

  const handleCancel = (values, action) => {
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
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
    },
    validationSchema: supplierSchema,
    onSubmit: handleSubmitForm,
  });

  // console.log(errors);
  return (
    <ContainerForAdmin>
      <div className="add-supplier-title">
        <h2 className="title-heading">Add Supplier</h2>
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
          {errors?.name && touched.name ? (
            <span className="error-class">Name is required</span>
          ) : (
            ""
          )}
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
          {errors?.email && touched.email ? (
            <span className="error-class">Email is required</span>
          ) : (
            ""
          )}
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
          {errors?.mobile && touched.mobile ? (
            <span className="error-class">Mobile number is required</span>
          ) : (
            ""
          )}
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
          <button type="reset" onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
        </div>

        <div className="notes">
          <span className="note-title">Note : </span>
          <span className="note-value">
            Supplier can be user for that he/she needs to signup through the
            application.
          </span>
        </div>
      </AddSupplierForm>
    </ContainerForAdmin>
  );
};

export const ContainerForAdmin = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  padding-left: 4em;
  padding-top: 2em;
  .add-supplier-title {
    color: #515152;
    h2 {
      font-family: "Hind";
      font-weight: 600;
    }
  }
  .error-class {
    color: red;
  }
`;

export const AddSupplierForm = styled.form`
  margin-top: 1em;
  width: 30em;
  gap: 1rem;
  display: flex;
  font-family: "Hind";
  flex-direction: column;
  .field {
    display: flex;
    flex-direction: column;

    label {
      font-size: 1.1rem;
      color: #515152;
      font-weight: 500;
    }
    input {
      padding: 0.4em 0.5em;
      font-size: 1.1rem;
      border-radius: 3px;
      box-shadow: 0px 0px 2px 1px #515152;
      -webkit-box-shadow: 0px 0px 2px 1px #515152;
      -moz-box-shadow: 0px 0px 2px 1px #515152;

      &:focus {
        outline: 0;
        box-shadow: 0px 0px 2px 1px #537fe7;
        -webkit-box-shadow: 0px 0px 2px 1px #537fe7;
        -moz-box-shadow: 0px 0px 2px 1px #537fe7;
      }
    }

    .input-error {
      box-shadow: 0px 0px 2px 1px red;
      -webkit-box-shadow: 0px 0px 2px 1px red;
      -moz-box-shadow: 0px 0px 2px 1px red;
    }
  }

  .buttons {
    display: flex;
    /* border: 1px solid blue; */
    justify-content: space-between;
    margin-top: 1em;

    button {
      padding: 0.2em 4.5em;
      font-size: 1.2rem;
      border-radius: 4px;
      background-color: #19a7ce;
      color: #ffff;
      transition: 200ms ease-in-out;
      &:hover {
        background-color: #0d8bad;
        text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.6);
      }
    }

    .cancel-btn {
      background-color: #4d8da8;
      color: white;
    }
    .submitting {
      opacity: 0.35;
    }
  }

  .notes {
    .note-title {
      color: #096075;
    }

    .note-value {
      color: #515152;
    }
  }
`;
export default AddSupplier;
