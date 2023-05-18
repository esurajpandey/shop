import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { Button, Input, Select, Textarea, useToast } from "@chakra-ui/react";
import { productSchema } from "../../../../validation/AdminValidation";
import { MdClose } from "react-icons/md";
import AddColor from "./modal/AddColor";
import AddBrand from "./modal/AddBrand";
import AddAttributes from "./modal/AddAttributes";
import AddCategory from "./modal/AddCategory";
import { Link } from "react-router-dom";

import {
  AddProductContainer,
  AddProductForm,
  AttributeList,
  ButtonsContainer,
  CategoriesList,
  InputBox,
  InputContainer,
  LabelText,
} from "./AddProduct.style";
import {
  addProduct,
  getBrands,
  getCategories,
  getColors,
  getSuppliers,
} from "../../../../api/Admin";

const AddProduct = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadin, setLoading] = useState(false);
  const [productCategories, setProductCategories] = useState([]);
  const [attrName, setAttrName] = useState("");
  const [attrValue, setAttrValue] = useState("");
  const [productAttributes, setProductAttributes] = useState([]);
  const [pic, setPic] = useState("");
  const toast = useToast({
    duration: 2000,
    isClosable: true,
    position: "top-right",
  });

  const handleProductAttributes = () => {
    if (attrName && attrValue) {
      const data = { name: attrName, value: attrValue };
      setProductAttributes((prev) => [...prev, data]);
      setAttrName("");
      setAttrValue("");
    } else {
      toast({
        status: "error",
        colorScheme: "blue",
        title: "Name and value is required",
        duration: 5000,
        isClosable: true,
      });
    }
    setAttributeModal(false);
  };

  const removeAttribute = (atrName) => {
    const newList = productAttributes.filter((item) => item.name != atrName);
    setProductAttributes((prev) => [...newList]);
  };

  const [colorModal, setColorModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [attributeModal, setAttributeModal] = useState(false);

  const handleColorModal = () => {
    setColorModal(!colorModal);
  };
  const handleBrandModal = () => {
    setBrandModal(!brandModal);
  };
  const handleCategoryModal = () => {
    setCategoryModal(!categoryModal);
  };

  const handleAttributeModal = () => {
    setAttributeModal(!attributeModal);
  };

  //form handler
  const handleSubmitForm = async (values, action) => {
    try {
      if (productAttributes.length === 0) {
        alert("Hello");
        toast({
          title: "Add some product attribute",
          status: "warning",
        });
        setLoading(false);
        setSubmitting(false);
        return;
      }

      const formData = {
        ...values,
        pictures: JSON.stringify([pic]),
        attributes: JSON.stringify(productAttributes),
      };
      if (!(formData.pictures && pic)) {
        toast({
          title: "Please Select an Image",
          status: "warning",
        });
        setSubmitting(false);
        return;
      }

      setProductAttributes((prev) => []);
      setPic("");

      const data = await addProduct(formData);
      action.resetForm();
      console.log(data);
      toast({
        title: data.message,
        status: "success",
      });
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
      });
      setLoading(false);
    }
  };
  const handleCancel = () => {};

  const {
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    values,
    handleReset,
    setSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      quantity: "",
      unitPrice: "",
      description: "",
      weight: "",
      colorId: "",
      brandId: "",
      supplierId: "",
      categoryId: "",
    },
    validationSchema: productSchema,
    onSubmit: handleSubmitForm,
    handleReset: handleCancel,
  });

  const UploadImage = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "my-chat-app");
      data.append("clound_name", "durmhsdmz");
      fetch("https://api.cloudinary.com/v1_1/durmhsdmz/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data?.url?.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image",
        status: "warning",
      });
      setLoading(false);
      return;
    }
  };

  const fetchColors = async () => {
    try {
      const data = await getColors();
      setColors(data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const data = await getSuppliers();
      setSuppliers(data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBrands = async () => {
    try {
      const data = await getBrands();
      setBrands(data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchColors();
    fetchBrands();
    fetchCategories();
    fetchSuppliers();
  }, []);

  return (
    <AddProductContainer>
      <div className="title">Add Product</div>
      <AddProductForm>
        <div className="input-conatiners">
          <InputContainer>
            <LabelText>Product Name</LabelText>
            <InputBox
              type="text"
              value={values.name}
              onChange={handleChange}
              name="name"
              style={{ background: "white" }}
            />
            {errors.name && touched.name && (
              <span className="error-class">{errors.name}</span>
            )}
          </InputContainer>
          <InputContainer>
            <LabelText>Unit Price &#8377;</LabelText>
            <InputBox
              type="number"
              value={values.unitPrice}
              onChange={handleChange}
              name="unitPrice"
            />
            {errors.unitPrice && touched.unitPrice ? (
              <span className="error-class">{errors.unitPrice}</span>
            ) : (
              ""
            )}
          </InputContainer>
          <InputContainer>
            <LabelText>Quantity</LabelText>
            <InputBox
              type="number"
              value={values.quantity}
              onChange={handleChange}
              name="quantity"
            />
            {errors.quantity && touched.quantity ? (
              <span className="error-class">{errors.quantity}</span>
            ) : (
              ""
            )}
          </InputContainer>
          <InputContainer>
            <LabelText>Product weight</LabelText>
            <InputBox
              type="number"
              value={values.weight}
              onChange={handleChange}
              name="weight"
            />
            {errors.weight && touched.weight ? (
              <span className="error-class">{errors.weight}</span>
            ) : (
              ""
            )}
          </InputContainer>
          <InputContainer>
            <LabelText>
              Color{" "}
              {/* <button className="open-model-btn" onClick={handleColorModal}>
                Add color
              </button> */}
            </LabelText>
            <Select
              placeholder="Select color"
              bg={"white"}
              onChange={handleChange}
              name="colorId"
            >
              {colors.length > 0 &&
                colors.map((color) => {
                  return (
                    <option value={color.id} key={color.id}>
                      {color.name}
                    </option>
                  );
                })}
            </Select>
            {errors.colorId && touched.colorId ? (
              <span className="error-class">{errors.colorId}</span>
            ) : (
              ""
            )}
          </InputContainer>
          <InputContainer>
            <LabelText>
              Brand{" "}
              <button className="open-model-btn" onClick={handleBrandModal}>
                Add brand
              </button>
            </LabelText>

            <Select
              placeholder="Select brand"
              bg={"white"}
              onChange={handleChange}
              name="brandId"
            >
              {brands.length > 0 &&
                brands.map((brand) => {
                  return (
                    <option value={brand.id} key={brand.id}>
                      {brand?.name}
                    </option>
                  );
                })}
            </Select>
            {errors.brandId && touched.brandId ? (
              <span className="error-class">{errors.brandId}</span>
            ) : (
              ""
            )}
          </InputContainer>
          <InputContainer>
            <LabelText>
              Select supplier <Link to="/admin/add-supplier">Add supplier</Link>
            </LabelText>
            <Select
              placeholder="Select supplier"
              bg={"white"}
              onChange={handleChange}
              name="supplierId"
            >
              {suppliers.length > 0 &&
                suppliers.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </Select>
            {errors.supplierId && touched.supplierId ? (
              <span className="error-class">{errors.supplierId}</span>
            ) : (
              ""
            )}
          </InputContainer>
          <InputContainer>
            <LabelText>Product image</LabelText>
            <Input
              type="file"
              p={1.5}
              accept="image/*"
              onChange={(e) => UploadImage(e.target.files[0])}
              bg={"white"}
              _placeholder={{ color: "#69abbd" }}
            />
          </InputContainer>
          <InputContainer className="desc" style={{ padding: "0" }}>
            <LabelText>Description</LabelText>
            <Textarea
              placeholder="Product description"
              size="sm"
              resize="none"
              maxH={"10em"}
              style={{
                height: "50px",
              }}
              bg={"white"}
              name="description"
              onChange={handleChange}
              value={values.description}
            />
            {errors.description && touched.description ? (
              <span className="error-class">{errors.description}</span>
            ) : (
              ""
            )}
          </InputContainer>
          <InputContainer className="desc" style={{ padding: "0" }}>
            <LabelText>
              Product categories{" "}
              <button className="open-model-btn" onClick={handleCategoryModal}>
                Create category
              </button>
            </LabelText>
            <Select
              placeholder="Select categories"
              bg={"white"}
              onChange={handleChange}
              name="categoryId"
            >
              {categories.length > 0 &&
                categories.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </Select>

            <CategoriesList>
              {productCategories?.length > 0 &&
                productCategories.map((item) => {
                  return (
                    <span key={item.id}>
                      {item.name} <MdClose />
                    </span>
                  );
                })}
            </CategoriesList>
            {errors.categoryId && touched.categoryId ? (
              <span className="error-class">{errors.categoryId}</span>
            ) : (
              ""
            )}
          </InputContainer>

          <InputContainer className="desc" style={{ padding: "0" }}>
            <LabelText>
              Product attributes
              <button className="open-model-btn" onClick={handleAttributeModal}>
                Add new attribute
              </button>
            </LabelText>
            <AttributeList>
              {productAttributes.length > 0 &&
                productAttributes.map((item) => {
                  return (
                    <div className="attribute-item" key={item.name}>
                      <span className="attr-name">{item.name}</span> :{" "}
                      <span className="attr-val">{item.value}</span>
                      <MdClose onClick={() => removeAttribute(item.name)} />
                    </div>
                  );
                })}
            </AttributeList>
          </InputContainer>
        </div>

        <ButtonsContainer>
          <Button
            colorScheme="telegram"
            width={"10em"}
            type="submit"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Submit
          </Button>
          <Button
            colorScheme="yellow"
            width={"10em"}
            type="reset"
            onClick={handleReset}
            isLoading={isSubmitting}
          >
            Cancel
          </Button>
        </ButtonsContainer>
      </AddProductForm>
      <AddColor onClose={handleColorModal} isOpen={colorModal} />
      <AddAttributes
        onClose={handleAttributeModal}
        isOpen={attributeModal}
        onSubmit={handleProductAttributes}
        atrName={attrName}
        atrValue={attrValue}
        setName={setAttrName}
        setValue={setAttrValue}
      />
      <AddBrand
        onClose={handleBrandModal}
        isOpen={brandModal}
        onSubmit={fetchBrands}
      />
      <AddCategory
        onClose={handleCategoryModal}
        isOpen={categoryModal}
        fetchCateory={fetchCategories}
      />
    </AddProductContainer>
  );
};

export default AddProduct;
