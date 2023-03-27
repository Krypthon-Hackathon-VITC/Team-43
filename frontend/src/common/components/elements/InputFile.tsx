import { useFormikContext } from "formik";
import React, { useState } from "react";
import { IMAGE_TYPES } from "@utils/constants";
import { FileUploadProps } from "primereact/fileupload";
import { ipfsClient } from "@utils/ipfs-core";

import { FilePond, registerPlugin } from "react-filepond";
import type {
  ActualFileObject,
  FilePondFile,
  FilePondInitialFile,
} from "filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";

interface Props extends FileUploadProps {
  name: string;
  id?: string;
  label?: string;
  required?: boolean;
  fileType?: string[];
  getFileUrl?: (url: string) => void;
}

registerPlugin(FilePondPluginFileValidateType);

const InputFile: React.FC<Props> = ({
  name,
  id = name,
  label,
  required = false,
  getFileUrl,
  fileType = IMAGE_TYPES,
  maxFileSize = 1000000,
  ...rest
}) => {
  const { isSubmitting, setFieldValue } = useFormikContext();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] =
    useState<
      (FilePondInitialFile | FilePondFile | Blob | ActualFileObject)[]
    >();

  return (
    <div className="w-full grid gap-1">
      {!!label && (
        <label
          htmlFor={id}
          className="text-lg font-medium text-gray-700 dark:text-gray-200"
        >
          {label} {required && "*"}
        </label>
      )}

      <FilePond
        id={id}
        name={name}
        // @ts-ignore
        files={files}
        onupdatefiles={setFiles}
        acceptedFileTypes={fileType}
        server={{
          process: async (fieldName, file, metadata, load) => {
            setIsLoading(true);

            if (file) {
              setFiles([file]);

              try {
                const client = await ipfsClient();
                const { cid } = await client.add(file);
                const url = `https://ipfs.io/ipfs/${cid}`;
                getFileUrl?.(url);
                setFieldValue(name, url);

                console.log({ url });
                load(url);
              } catch (error) {
                console.log(error);
              }
            }

            setIsLoading(false);
          },
        }}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        disabled={isSubmitting || isLoading}
        {...rest}
      />
    </div>
  );
};

export default InputFile;
