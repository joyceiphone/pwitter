import React from "react";
import { useState } from "react";

import Banner from "../../components/Banner";
import Selectrelationship from "../../components/Selectrelationship";
import axios from "axios";

import "./index.scss";

export default function Mysetting({
  user,
}) {
  const profileInputs = [
    {
      name: "firstName",
      title: "My name",
      type: "text",
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "number",
    },
    {
      name: "address",
      title: "Home Address",
      type: "text",
    },
    {
      name: "relationship",
      title: "Relationship Status",
      type: "select",
    },
    {
      name: "avatar",
      title: "Profile Status",
      type: "file",
    },
  ];
  const [values, setValues] = useState(
    {}
  );
  const [
    previewLink,
    setPreviewLink,
  ] = useState("");
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleRelationshipUpdate = (
    text
  ) => {
    const nextValues = {
      ...values,
      relationship: text,
    };
    setValues(nextValues);
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
    const uploadResult = await axios.post(
      "https://pwitterjoyce.herokuapp.com/auth/images",
      formData
    );
    setValues({
      ...values,
      avatar: uploadResult.data.data[0],
    });
  };

  const handleChangeProfile = async (
    name
  ) => {
    const token = window.localStorage.getItem(
      "token"
    );
    if (token) {
      const updateResult = await axios.post(
        "https://pwitterjoyce.herokuapp.com/users/update",
        {
          field: name,
          value: values[name],
          userId: user._id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (updateResult.data.success) {
        console.log(updateResult);
      } else {
        alert("soemthing is wrong");
      }
    }
  };

  return (
    <div className="my-setting-container page">
      <div className="setting-container">
        <div className="card-head">
          <Banner text="My Profile Settings" />
        </div>
        <div className="setting-body">
          {profileInputs.map(
            (profileInput) => (
              <div
                key={profileInput.name}
                className="profile-card-container"
              >
                <div className="profile-title">
                  {profileInput.title}
                </div>
                <div className="change-profile-content">
                  {profileInput.type ===
                  "select" ? (
                    <div className="change-profile-input relationship-input">
                      <Selectrelationship
                        data={
                          values.relationship
                        }
                        handleRelationshipUpdate={
                          handleRelationshipUpdate
                        }
                      />
                      <span>
                        Change
                      </span>
                    </div>
                  ) : profileInput.name ===
                    "avatar" ? (
                    <div className="profile-image">
                      <input
                        type="file"
                        onChange={
                          handleFileUpload
                        }
                      />
                      <img
                        src={
                          previewLink
                        }
                        alt="preview"
                      />
                    </div>
                  ) : (
                    <div className="change-profile-input">
                      <input
                        name={
                          profileInput.name
                        }
                        onChange={
                          handleInputChange
                        }
                        values={
                          values[
                            profileInput
                              .name
                          ]
                        }
                        type="text"
                      />
                      <span
                        onClick={() =>
                          handleChangeProfile(
                            profileInput.name
                          )
                        }
                      >
                        Change
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
