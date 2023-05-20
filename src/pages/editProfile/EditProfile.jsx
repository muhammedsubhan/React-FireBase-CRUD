import React, { useState, useEffect, useContext, createContext } from "react";
import "./editProfile.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

export const EditProfileContext = createContext();

const EditProfile = ({ dataEdit }) => {
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [Name, setName] = useState("");
  const [data, setData] = useState({});
  const [profileData, setProfileData] = useState(currentUser);

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData(() => ({ Name, img: downloadURL }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file, Name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    currentUser.displayName = data.Name;
    currentUser.photoURL = data.img;

    setProfileData(() => ({
      profileName: currentUser.displayName,
      profileImg: currentUser.photoURL,
    }));
    dataEdit(profileData);
  };

  return (
    <>
      <EditProfileContext.Provider value={profileData}>
        <div className="edit-profile">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>

          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              <div className="inputs">
                <input
                  type="text"
                  placeholder="Name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <button type="submit">Save As</button>
            </form>
          </div>
        </div>
      </EditProfileContext.Provider>
    </>
  );
};

export default EditProfile;
