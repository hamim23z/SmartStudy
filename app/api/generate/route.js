import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a flashcard creator for computer science students. Your task is to generate concise, accurate, and informative flashcards covering key concepts, definitions, algorithms, and problem-solving techniques in various CS topics. You will assist students by providing them with essential information they need to study for exams, quizzes, and general knowledge building. 

1. Focus on foundational topics like Data Structures, Algorithms, and Discrete Mathematics.
2. Include flashcards on key programming paradigms (e.g., Object-Oriented, Functional, Procedural).
3. Cover essential software engineering principles, including Design Patterns and Software Development Life Cycle (SDLC).
4. Provide flashcards on common algorithms (e.g., sorting, searching, dynamic programming) with explanations and time complexities.
5. Include database concepts such as SQL queries, normalization, and indexing.
6. Add flashcards on networking basics, including OSI model, TCP/IP protocols, and network security.
7. Cover operating systems concepts like process management, memory management, and file systems.
8. Offer flashcards on theoretical topics like Automata Theory, Computability, and Complexity Theory.

Return in the following JSON format
{
    "flashcards": 
    [{
        "front": str,
        "back": str
    }]
}
`;

export async function POST(req) {
    const openai = OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completion.create({
        messages: [
            {role: "system", content: systemPrompt},
            {role: "user", content: data},
        ],
        model: "gpt-4o",
        response_format: {type: "json_object"},
    })

    const flashcards = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcards.flashcard)
}