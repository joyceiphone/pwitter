import React from "react";
import Banner from "../../components/Banner";
import Header from "../../components/Header";
import ProfileCard from "../../components/ProfileCard";

export default function Myprofile({
  user,
}) {
  const profileLists = [
    {
      title: "My name",
      name: "My name",
      data:
        user.firstName +
        " " +
        user.lastName,
    },
    {
      title: "My Phone Number",
      name: "phone",
      data: user.phone,
    },
    {
      title: "My Home Address",
      name: "address",
      data: "jamaica, ny",
    },
    {
      title: "My Relationship Status",
      name: "relationship",
      data: "In a relationship",
    },
    {
      title: "My Profile Picture",
      name: "Avatar",
      data: user.avatar,
    },
  ];
  return (
    <div className="profile-page-container page">
      {user._id && (
        <Header user={user} />
      )}
      <div className="card-container">
        <div className="card-head">
          <Banner text="My Profile" />
        </div>
        <div className="profile-body">
          {profileLists.map(
            (profileList) => (
              <ProfileCard
                title={
                  profileList.title
                }
                data={profileList.data}
                name={profileList.name}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
