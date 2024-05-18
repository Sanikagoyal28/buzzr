"use client"
import SubmitButton from "../../SubmitButton";
import InputField from "../../InputField";
import { FormLabel, IconButton } from '@mui/material';
import { RadioField1, RadioField2, RadioField3, RadioField4 } from "@/components/RadioField";
import editQues from "@/actions/EditQuesAction";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Option, Question } from "@prisma/client";
import { MdDelete } from "react-icons/md";

const EditQuesForm = (props: { quizId: string, ques: Question, options: Option[] }) => {

    async function clientAction(formData: FormData) {
        const result = await editQues(formData, props.ques.id);
        if (result?.error) {
            const errorMsg = result.error || "Something went wrong";
            toast.error(errorMsg)
        }
        else {
            toast.success("Successfully Edited Question")
        }
    }
    async function handleDeleteImage(formData: FormData){
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
            {props.ques.media && props.ques.media.length > 0 && (
                <div className="flex items-center justify-center">
                    <img src={props.ques.media} alt="Question Media" className="w-24 h-24 object-cover" />
                    <IconButton> <MdDelete> </MdDelete> </IconButton>
                </div>
            )}
            <FormLabel className="text-white mt-2" >Upload Image / Video / Audio</FormLabel>
            <InputField type="file" accept="image/*" className="text-white rounded-full p-2 w-full" name="file" placeholder="Select file" autoComplete="off" />
            <p className="text-xs mt-[-8px] text-gray-400">Choose any image or gif of size &lt; 10MB </p>
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
