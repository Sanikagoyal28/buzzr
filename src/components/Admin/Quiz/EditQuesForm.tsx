"use client"
import SubmitButton from "../../SubmitButton";
import InputField from "../../InputField";
import { FormLabel } from '@mui/material';
import { RadioField1, RadioField2, RadioField3, RadioField4 } from "@/components/RadioField";
import editQues from "@/actions/EditQuesAction";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Option, Question } from "@prisma/client";
import { SingleImageDropzone } from "@/components/FileDropzone";
import { useState } from "react";
import { useEdgeStore } from "@/state/EdgeStoreProvider";

const EditQuesForm = (props: { quizId: string, ques: Question, options: Option[] }) => {

    
    const [file, setFile] = useState<File>();
    const { edgestore } = useEdgeStore();
    const [url, setUrl] = useState<string|null>(props.ques.media);

    async function clientAction(formData: FormData) {
        if (file) {
            const res = await edgestore.questionImages.upload({
                file,
                onProgressChange: (progress: any) => {
                    console.log(progress);
                },
            });
            formData.append("file", res.url);
        }
        const result = await editQues(formData, props.ques.id);
        if (result?.error) {
            const errorMsg = result.error || "Something went wrong";
            toast.error(errorMsg)
        }
        else {
            toast.success("Successfully Edited Question")
        }
        
    }

    return <>
        <h1 className="text-2xl text-white text-center">Edit Question</h1>
        <form
            action={clientAction}
            className="flex flex-col justify-center mx-auto px-1"
        >
            <input type="text" className="hidden" name="quiz_id" value={props.quizId} />
            <FormLabel className="text-white mt-2">Question</FormLabel>
            <InputField
                type="text"
                name="title"
                placeholder="Title"
                className="text-slate-900 my-2 rounded-full p-2 outline-none"
                required
                defaultValue={props.ques.title}
                autoComplete="off"
            />
            <SingleImageDropzone
                name="file"
                width={200}
                height={200}
                value={url != null && file === undefined  ? url : file}
                onChange={(file) => {
                    setFile(file);
                }}
                removeMedia={() => {
                    setUrl(null);
                    setFile(undefined);
                }}
            />
            <FormLabel>Enter options</FormLabel>
            <div className="grid grid-cols-2 gap-x-2">
                <div>
                    <InputField
                        type="text"
                        name="option1"
                        placeholder="Enter option 1"
                        autoComplete="off"
                        className="text-slate-900 my-2 rounded-full p-2 outline-none w-1/2"
                        style="question"
                        defaultValue={props.options[0].title}
                        required
                    />
                    <RadioField1 />
                </div>
                <div>
                    <InputField
                        type="text"
                        name="option2"
                        placeholder="Enter option 2"
                        autoComplete="off"
                        className="text-slate-900 my-2 rounded-full p-2"
                        style="question"
                        defaultValue={props.options[1].title}
                        required
                    />
                    <RadioField2 />
                </div>
                <div>
                    <InputField
                        type="text"
                        name="option3"
                        placeholder="Enter option 3"
                        autoComplete="off"
                        className="text-slate-900 my-2 rounded-full p-2"
                        style="question"
                        defaultValue={props.options[2].title}
                        required
                    />
                    <RadioField3 />
                </div>
                <div>
                    <InputField
                        type="text"
                        name="option4"
                        placeholder="Enter option 4"
                        autoComplete="off"
                        className="text-slate-900 my-2 rounded-full p-2"
                        style="question"
                        defaultValue={props.options[3].title}
                        required
                    />
                    <RadioField4 />
                </div>
            </div>
            <FormLabel className="text-white mt-2">Question Time</FormLabel>
            <InputField
                type="number"
                name="time"
                placeholder="question time"
                className="text-slate-900 my-2 rounded-full p-2 outline-none"
                required={false}
                autoComplete="off"
                defaultValue={props.ques.timeOut}
            />

            <div className="text-center mt-2">
                <SubmitButton text="Update" />
            </div>
        </form>
    </>
};

export default EditQuesForm;
