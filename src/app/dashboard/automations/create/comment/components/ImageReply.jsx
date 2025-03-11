'use client'

import {
    FileUploadDropzone,
    FileUploadList,
    FileUploadRoot,
} from "@/components/ui/file-upload";
import Image from "next/image";
import { useState } from "react";
  

const ImageReply = ({value='',handleValue,loading}) => {

  const [fileLoading,setFileloading]  = useState(false);

  const handleFileChange = (e)=>{
    setFileloading(true)
    console.log(e.target.files)
  }
  return (
    <FileUploadRoot maxW="xl" alignItems="stretch" maxFiles={1} onChange={handleFileChange}>
        <FileUploadDropzone
          label="Drag and drop here to upload"
          description=".png, .jpg up to 5MB"
          cursor={fileLoading ? '' : "pointer"}
          // showIcon={false}
        >
          <Image
            width={70}
            height={70}
            alt="DM Image"
            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYy2yyFzrXbXHmDnKTi7ezu275JN9Ai0HTyA&s'}
          />
        </FileUploadDropzone>
        <FileUploadList  />
    </FileUploadRoot>
  )
}

export default ImageReply