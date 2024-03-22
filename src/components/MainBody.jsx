import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { Card } from "primereact/card";

const MainBody = () => {
  const apiURl = import.meta.env.VITE_API_URL;
  const toast = useRef(null);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [exampleDialog, setExampleDialog] = useState(false);
  const [result, setResult] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const onUpload = (e) => {
    console.log("onUpload", e.files[0]);
    setImageUrl(e.files[0].objectURL);
    const formData = new FormData();
    formData.append("file", e.files[0]);

    axios
      .post(`${apiURl}predict`, formData)
      .then((res) => {
        console.log(res.data);
        setShowResultDialog(true);
        setResult(res.data);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Age and gender predicted successfully .",
        });
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Some Error Occured",
          detail: "Backend Error occured , please check API",
        });
      });
  };
  const exampleCards = [
    {
      imageUrl: "/images/face1.jpg",
      header: "Clear Face",
      descrption: "Show the clear face from the front side .",
    },
    {
      imageUrl: "/images/boycoat.jpg",
      header: "More Face",
      descrption: "Face should cover at least 60% of the picture",
    },
    {
      imageUrl: "/images/group.jpg",
      header: "Single facial image",
      descrption: "Photo should contain only one photo.",
    },
  ];

  return (
    <>
      <Dialog
        header="For Better Results"
        visible={exampleDialog}
        style={{ width: "70vw" }}
        onHide={() => setExampleDialog(false)}
      >
        <div className="row">
          {exampleCards.map(({ imageUrl, header, descrption }, i) => {
            return (
              <div className="col-md-6">
                <Card
                  title={header}
                  header={
                    <img alt="Card" height="350" width="200" src={imageUrl} />
                  }
                  className="md:w-25rem mb-3"
                >
                  <p className="m-0">{descrption}</p>
                </Card>
              </div>
            );
          })}
        </div>
      </Dialog>
      <Dialog
        header="Predicted age and gender"
        visible={showResultDialog}
        style={{ width: "50vw" }}
        onHide={() => window.location.reload()}
        baseZIndex="2"
        draggable={false}
      >
        <div className="result_wrapper">
          <img src={imageUrl} className="img-fluid" alt="Uploaded Image" />
          <div className="result mt-3">
            <p className="mb-1">Gender: {result.gender}</p>
            <p className="mb-0">Age: {result.age}</p>
          </div>
          <Button
            label="Try Again"
            severity="secondary"
            rounded
            onClick={() => {
              window.location.reload();
            }}
            className="mt-3"
          />
          <Button
            label="Want Better Result ?"
            severity="danger"
            rounded
            onClick={() => setExampleDialog(true)}
            className="ml-2 mt-3"
          />
        </div>
      </Dialog>
      <Toast ref={toast} position="buttom-left" baseZIndex="1" />
      <div className="upload_wrapper">
        <div className="row">
          <div className="text-center">
            <div className="">
              <FileUpload
                customUpload={true}
                mode="advanced"
                accept="image/*"
                maxFileSize={1000000}
                uploadHandler={onUpload}
                chooseLabel="Upload Image"
                uploadLabel="Predict Age and Gender"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBody;
