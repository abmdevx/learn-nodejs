# AI Study Workflow — Node.js

Use this workflow for every important lesson. Keep it simple.

## 1. Learn the lesson

Finish the Educative lesson first. Try to understand it before asking AI for notes.

---

## 2. Test yourself

Paste the lesson content and use this prompt:

> I just completed this Node.js lesson. Quiz me with 5 questions, one at a time. Start easy and become harder. Don't give me the answer unless I'm stuck. At the end, tell me what I understand well and what I should review.
>
> Lesson:
> [PASTE LESSON CONTENT]

---

## 3. Explain it in your own words

After the quiz, explain the main concept to AI using voice typing if you don't want to type.

Use:

> This is my understanding of the lesson. Check whether I actually understand it. Tell me what is correct, what is wrong, and what important thing I'm missing. Be technically honest and concise.
>
> My explanation:
> [SPEAK/PASTE YOUR EXPLANATION]

---

## 4. Create your notes

Only after you understand the lesson, use:

> Turn the lesson and my understanding into concise Markdown notes for Obsidian. Don't copy the course wording. Keep only important concepts, definitions, examples, common mistakes, and key takeaways. Correct any mistakes in my understanding. Don't add unrelated advanced concepts.
>
> Use this structure:
> # [Topic]
> ## What is it?
> ## How it works
> ## Example
> ## Important Points
> ## Common Mistakes
> ## Key Takeaways
>
> Lesson:
> [PASTE LESSON]
>
> My understanding:
> [PASTE YOUR EXPLANATION]

Save the result in Obsidian.

---

## 5. Practice

For coding lessons, use:

> Give me 2-3 coding exercises based only on what I have learned so far. Don't give me solutions. I will attempt them first and then ask you to review my code.

Write the solution yourself.

Put meaningful examples/projects in `learn-nodejs`.

---

## 6. Final check

Before moving on, you should be able to:

- Explain the concept without looking at the notes.
- Explain why it is useful.
- Write a small example from scratch.
- Answer basic questions about it.
- Identify at least one common mistake or limitation.

If you cannot do these, review the lesson before moving on.

---

# The Rule

**Learn → Quiz → Explain → Notes → Practice → Move on**

AI should handle **summarizing, formatting, questioning, and reviewing**.

You should handle **understanding, recalling, and writing the code**.

## Don't over-document

Not every lesson needs a huge note.

- Course overview → a few bullets
- Simple concept → short note
- Important concept → detailed note + possible diagram
- Coding lesson → code in GitHub
- Major project → proper GitHub project

The goal is to **learn Node.js**, not to create perfect notes.
