import styled from "styled-components";

export const AddProductContainer = styled.div`
  padding: 1em;
  .desc {
   min-height: 6em;
   max-height: 8em;
  }

  .error-class{
    color : red;
    min-height: 5em;
  }
  .open-model-btn {
    outline: 0;
    border: 1px solid grey;
    padding: 0.1em 0.5em;
    font-size: 0.8rem;
    border-radius: 3px;
    transition: 250ms ease-in-out;
    &:hover {
      outline: 0;
      background-color: #c0dbea;
      box-shadow: -1px 0px 5px 0px rgba(17, 18, 18, 0.75);
      -webkit-box-shadow: -1px 0px 5px 0px rgba(17, 18, 18, 0.75);
      -moz-box-shadow: -1px 0px 5px 0px rgba(17, 18, 18, 0.75);
    }
  }
  .title{
    font-size: 1.5rem;
    font-family: "Hind";
    font-weight: 600;
  }
`;

export const AttributeList = styled.div`
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
  overflow-y: scroll;
  .attribute-item {
    padding: 0.1em 0.3em;
    background-color: #56bbf1;
    border-radius: 3px;
    color: #f7f1f1;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: default;
    svg {
      font-size: 1em;
      color: red;
      cursor: pointer;
    }
    .attr-name {
      color: #fef2f4;
      text-decoration: underline;
    }
  }
`;

export const CategoriesList = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
  overflow-y: scroll;
  margin-top: 0.3em;
  span {
    display: flex;
    padding: 0.1em 0.5em;
    background-color: #56bbf1;
    border-radius: 3px;
    color: #f7f1f1;
    display: flex;
    align-items: center;
    gap: 0.2em;
    svg {
      color: red;
      cursor: pointer;
    }
  }
`;

export const AddProductForm = styled.div`
  padding: 2em;
  background-color: #ebf0fe;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  align-items: center;
  .input-conatiners {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0em 2.4em;
  }
`;

export const InputContainer = styled.div`
  width: 26em;
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
  padding: 0.3em 0.3em;
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

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  padding: 0em 2.4em;
  width: 100%;
`;