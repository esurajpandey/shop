import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { AddressSchema } from "../../../validation/UserValidation";
import {
  createUserAddress,
  getAddress,
  updateAddressData,
} from "../../../api/User";
import { Button, useToast } from "@chakra-ui/react";
const MyAddress = () => {
  const [formType, setFormType] = useState("new");

  let address = {
    id: "",
    city: "",
    address_line1: "",
    country: "",
    state: "",
    zip: "",
  };

  const toast = useToast({
    isClosable: true,
    duration: 3000,
    position: "top-right",
  });

  const fetchAddress = async () => {
    try {
      const data = await getAddress();
      if (data.data) {
        setValues({ ...data.data });
        setFormType("old");
      }
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
      });
    }
  };

  const updateAddress = async (values, action) => {
    try {
      const data = await updateAddressData(values.id, values);
      if (data.data) {
        setValues({ ...data.data });
        setFormType("old");
      }
      toast({
        title: data.message,
        status: "success",
      });
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
      });
    } finally {
      // action.resetForm();
    }
  };

  const createAddress = async (values, action) => {
    try {
      const data = await createUserAddress(values);
      if (data.data) {
        setValues({ ...data.data });
        setFormType("old");
        toast({
          title: data.message,
          status: "success",
        });
        await fetchAddress();
      }
    } catch (err) {
      console.log(err);
      toast({
        title: err.message,
        status: "error",
      });
    } finally {
      action.resetForm();
    }
  };

  const {
    values,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    setValues,
  } = useFormik({
    initialValues: address,
    validationSchema: AddressSchema,
    onSubmit: formType === "old" ? updateAddress : createAddress,
  });

  useEffect(() => {
    fetchAddress();
  }, []);
  return (
    <AddressContainer>
      <div className="title">My address</div>
      <AddressForm>
        <div className="address-input-container">
          <InputContainer>
            <LabelText>Address line</LabelText>
            <InputBox
              value={values.address_line1}
              onChange={handleChange}
              onBlur={handleBlur}
              name="address_line1"
              placeholder="Enter address details..."
            />
            {errors?.address_line1 && touched.address_line1 ? (
              <span className="error-class">{errors.address_line1}</span>
            ) : (
              <></>
            )}
          </InputContainer>
          <InputContainer>
            <LabelText>City</LabelText>
            <InputBox
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              name="city"
              placeholder="Enter city name"
            />
            {errors?.city && touched.city ? (
              <span className="error-class">{errors.city}</span>
            ) : (
              <></>
            )}
          </InputContainer>
          <InputContainer>
            <LabelText>State</LabelText>
            <InputBox
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              name="state"
              placeholder="Enter state name"
            />
            {errors?.state && touched.state ? (
              <span className="error-class">{errors.state}</span>
            ) : (
              <></>
            )}
          </InputContainer>
          <InputContainer>
            <LabelText>Country</LabelText>
            <InputBox
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              name="country"
              placeholder="Enter country"
            />
            {errors?.country && touched.country ? (
              <span className="error-class">{errors.country}</span>
            ) : (
              <></>
            )}
          </InputContainer>
          <InputContainer>
            <LabelText>Zip code</LabelText>
            <InputBox
              value={values.zip}
              onChange={handleChange}
              onBlur={handleBlur}
              name="zip"
              placeholder="Enter zip code"
            />
            {errors?.zip && touched.zip ? (
              <span className="error-class">{errors.zip}</span>
            ) : (
              <></>
            )}
          </InputContainer>
        </div>
        <div className="address-submit-container">
          <Button
            colorScheme="telegram"
            width={"10em"}
            type="submit"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            {formType === "old" ? "Update address" : "Create address"}
          </Button>
        </div>
      </AddressForm>
    </AddressContainer>
  );
};

export const AddressContainer = styled.div`
  font-family: "Hind";
  .title {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .error-class {
    color: red;
  }
`;

export const AddressForm = styled.form`
  background-color: #ebf0fe;
  padding: 1.4em 2em;
  width: 100%;
  height: 100%;
  min-height: 63vh;
  max-height: 73vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 5px;
  .address-input-container {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
  .address-submit-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    max-width: 22em;
    gap: 2rem;
  }
`;

export const InputContainer = styled.div`
  width: 22em;
  min-height: 4.2em;
  max-height: 5.5em;
  margin-right: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.15em;
  border-radius: 3px;
  @media (max-width: 700px) {
    width: 22em;
    margin-right: 0rem;
  }
`;

export const LabelText = styled.label`
  font-family: "Hind";
  font-size: 1.1rem;
  color: #524a4e;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8em;
`;

export const InputBox = styled.input`
  padding: 0.4em 0.3em;
  font-size: 1rem;
  font-family: "Hind";
  border: 0;
  outline: 0;
  background: white;
  border-radius: 4px;
  &:active {
    border: 0;
    outline: 0;
  }
  &:focus {
    box-shadow: 0px 0px 3px 1px #4d77ff;
    -webkit-box-shadow: 0px 0px 3px 1px #4d77ff;
    -moz-box-shadow: 0px 0px 3px 1px #4d77ff;
  }
`;

export default MyAddress;
