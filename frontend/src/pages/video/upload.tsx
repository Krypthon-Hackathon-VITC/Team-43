import Input from "@components/elements/Input";
import InputFile from "@components/elements/InputFile";
import TextArea from "@components/elements/Textarea";
import Form from "@components/Form";
import { PageLayout } from "@layouts/PageLayout";
import React, { useState } from "react";
import * as y from "yup";
import { Steps } from "primereact/steps";
import { VIDEO_TYPES } from "@utils/constants";
import InputChips from "@components/elements/InputChips";
import useContractWrite from "@hooks/useContractWrite";
import { uuid } from "@utils/uuid";
import { useRouter } from "next/router";
import { useStore } from "@utils/store";
import withAuth from "@hoc/withAuth";

const initialValues = {
  title: "",
  videoUrl: "",
  thumbnailUrl: "",
  description: "",
};

const schema = y.object().shape({
  title: y
    .string()
    .max(100, "Title must be below 100 characters")
    .required("Title is required"),
  videoUrl: y.string().required("Video is required"),
  thumbnailUrl: y.string().required("Thumbnail is required"),
  description: y.string().required("Description is required"),
  tags: y.array().min(1).required("Tags is required"),
});

const items = [
  {
    label: "Upload Video",
  },
  {
    label: "Upload Thumbnail",
  },
  {
    label: "Video Details",
  },
];

const UploadVideo = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const { mutateAsync } = useContractWrite("uploadVideo");

  const { isCreator } = useStore();

  return (
    <PageLayout title="Upload Video" className="flex flex-col ">
      <Form
        className="mt-5 bg-black p-2 sm:p-4 rounded-lg border"
        initialValues={initialValues}
        schema={schema}
        onSubmit={async (values) => {
          const valuesInArray = Object.values(values);

          await mutateAsync([uuid(), ...valuesInArray], "Video Uploaded");

          router.replace("/");
        }}
        submitButton={{ title: activeIndex === 2 ? "Upload" : "" }}
      >
        <Steps
          model={items}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={false}
          className="!font-semibold"
        />

        {activeIndex === 0 ? (
          <InputFile
            key="video"
            accept="video/*"
            label="Upload your Video"
            name="videoUrl"
            fileType={VIDEO_TYPES}
            maxFileSize={100000000}
            required
          />
        ) : activeIndex === 1 ? (
          <InputFile
            key="image"
            accept="image/*"
            label="Upload your Thumbnail"
            name="thumbnailUrl"
            required
          />
        ) : (
          <Form.Row>
            <Input
              label="Title"
              name="title"
              placeholder="Enter your Title"
              required
            />

            <TextArea
              label="Description"
              name="description"
              placeholder="Enter your Description"
              required
            />

            <InputChips
              label="Tags"
              name="tags"
              separator=","
              placeholder="Education, Gaming"
              required
            />
          </Form.Row>
        )}
      </Form>
    </PageLayout>
  );
};

export default withAuth(UploadVideo, true);
