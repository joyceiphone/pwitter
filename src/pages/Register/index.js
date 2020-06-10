import React from "react";
import classnames from "classnames";
import { useState } from "react";
import axios from "axios";

import registerFormInputs from "./forminputs";
import Select from "../../components/Select";

import "./index.scss";

export default function RegisterPage({
  history,
}) {
  const insertplaceholderText = (
    text
  ) => {
    const textArr = "Enter your here".split(
      " "
    );
    textArr.splice(2, 0, text);
    return textArr.join(" ");
  };
  const [values, setValues] = useState(
    {}
  );
  const [
    previewLink,
    setPreviewLink,
  ] = useState("");
  const handleGenderUpdate = (text) => {
    const nextValues = {
      ...values,
      gender: text,
    };
    setValues(nextValues);
  };
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleFileUpload = async (
    e
  ) => {
    const file = e.target.files[0];
    const link = URL.createObjectURL(
      file
    );
    setPreviewLink(link);
    const formData = new FormData();
    formData.append("files", file);
    console.log(formData);
    const uploadResult = await axios.post(
      "https://pwitterjoyce.herokuapp.com/auth/images",
      formData
    );
    console.log(uploadResult);
    setValues({
      ...values,
      avatar: uploadResult.data.data,
    });
  };
  const handleSubmit = async () => {
    console.log(values);
    const { phone, password } = values;
    try {
      const registerResult = await axios.post(
        "https://pwitterjoyce.herokuapp.com/auth/register",
        values
      );
      console.log(registerResult);
      if (registerResult.data.success) {
        const loginResult = await axios.post(
          "https://pwitterjoyce.herokuapp.com/auth/login",
          {
            phone,
            password,
          }
        );
        if (loginResult.data.success) {
          const token =
            loginResult.data.data;
          console.log(loginResult);
          window.localStorage.setItem(
            "token",
            token
          );
          history.push("/");
          window.location.reload();
        } else {
          alert("Something is wrong");
        }
      } else {
        alert(
          "soemthing is wrong with register"
        );
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-page page">
      <h1>Pwitter</h1>
      <div className="form-container">
        <h3>Register</h3>
        <form
          onSubmit={(e) =>
            e.preventDefault()
          }
          className="form-card"
        >
          {registerFormInputs.map(
            (registerFormInput) => {
              const placeholderText = insertplaceholderText(
                registerFormInput.text
              );
              return (
                <div
                  key={
                    registerFormInput.key
                  }
                  className={classnames(
                    "input-container",
                    {
                      isHalfWidth1:
                        registerFormInput.key ===
                        "age",
                    },
                    {
                      isHalfWidth2:
                        registerFormInput.key ===
                        "gender",
                    }
                  )}
                >
                  {registerFormInput.type ===
                  "file" ? (
                    <div className="file-uploader">
                      <div className="image-text-container">
                        <h4>
                          Profile
                          picture
                        </h4>
                        <img
                          src={
                            previewLink
                          }
                          alt="preview"
                        />
                      </div>
                      <input
                        className="file-input"
                        type="file"
                        placeholder={
                          placeholderText
                        }
                        onChange={
                          handleFileUpload
                        }
                      />
                    </div>
                  ) : registerFormInput.type ===
                    "select" ? (
                    <Select
                      data={
                        values.gender
                      }
                      handleGenderUpdate={
                        handleGenderUpdate
                      }
                    />
                  ) : (
                    <div>
                      <input
                        className="regular-input"
                        onChange={
                          handleInputChange
                        }
                        type={
                          registerFormInput.type
                        }
                        name={
                          registerFormInput.key
                        }
                        placeholder={
                          placeholderText
                        }
                      />
                    </div>
                  )}
                </div>
              );
            }
          )}
          <button
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
