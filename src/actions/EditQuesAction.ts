"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export default async function   editQues(formData: FormData,quesId:string) {
    try {
        const title = formData.get("title") as string;
        const option1 = formData.get("option1") as string;
        const option2 = formData.get("option2") as string;
        const option3 = formData.get("option3") as string;
        const option4 = formData.get("option4") as string;
        const time = formData.get("time") as string;
        const fileLink = formData.get("file") as string;
        const correct_option = formData.get("choose_option") as string;
        var options = [
            { title: option1, isCorrect: correct_option === "a" ? true : false },
            { title: option2, isCorrect: correct_option === "b" ? true : false },
            { title: option3, isCorrect: correct_option === "c" ? true : false },
            { title: option4, isCorrect: correct_option === "d" ? true : false },
        ];
        
        const session = await getServerSession(authOptions);
        if (!session || !session.user) redirect("/api/auth/signin");
        const existingQuestion = await prisma.question.findUnique({
            where: { id: quesId },
        });
        if (!existingQuestion) {
            throw new Error('Question record not found');
        }
        await prisma.option.deleteMany({
            where: {
                questionId: quesId,
            },
        });
        await prisma.question.update({
            where:{
                id: quesId,
            },
            data: {
                title: title,
                timeOut: parseInt(time),
                media: fileLink,
                mediaType: "image",
                options: {
                    create: options,
                },
            },
        }).then((res: any)=>{
            console.log("Question updated successfully")
        });
        revalidatePath("/quiz/[quizId]");
    } catch (err: any) {
        console.log("Error in editQues: ",err);
        return {
            error: err.message,
        };
    }
}
