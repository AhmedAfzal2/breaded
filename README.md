# 🍞 Breaded Guide

All game content is managed in a single file: `src/constants/questions.ts`. You can edit categories, write text questions, or use image URLs for both prompts and answers.

## 📐 Data Structure & Rules

The game uses two main arrays in `src/constants/questions.ts`:

- `CATEGORIES` (`string[][]`): Lists category names per board.
- `QUESTIONS` (`Question[][][]`): Contains question data organized as Board → Category → Questions.

**IMPORTANT:**

1. **Board Count Parity:** The number of boards in `CATEGORIES` must strictly match the number of boards in `QUESTIONS`.
2. **5 Questions Per Category:** Each category array must contain exactly 5 question objects, ordered from lowest points to highest points.

## 🖼️ Using Images in Questions or Answers

You can use both local image files and web image links for any `prompt` or `answer`.

### 1. Local Images (Recommended)

1. Place your image files inside the `public/qImages/` folder (create the `qImages` folder inside `public` if it doesn't exist).
2. Reference the path in your code starting with `/qImages/`:

```typescript
prompt: "/qImages/spider-man.jpg"
```

### 2. Web Images

Directly paste any direct web image URL:

```typescript
answer: "https://example.com/images/godfather.jpg"
```


## 📝 Example Question Combinations

You can mix and match text and images in any combination:

```typescript
export const QUESTIONS: Question[][][] = [
  [ // ================= BOARD 1 =================
    [ // Category 1: Movie Quotes
      // 1. Text Prompt -> Text Answer
      {
        prompt: "With great power comes great responsibility",
        answer: "Spider-Man (2002)",
      },

      // 2. Local Image Prompt -> Text Answer
      {
        prompt: "/qImages/guess-this-character.jpg",
        answer: "SpongeBob SquarePants",
      },

      // 3. Text Prompt -> Local Image Answer
      {
        prompt: "Identify the flag of Brazil",
        answer: "/qImages/brazil-flag.png",
      },

      // 4. Local Image Prompt -> Web Image Answer
      {
        prompt: "/qImages/landmark-question.jpg",
        answer: "https://example.com/eiffel-tower.jpg",
      },

      // 5. Text Prompt -> Text Answer
      {
        prompt: "You're like my own personal brand of heroin",
        answer: "Twilight (2008)",
      },
    ],
    // ... 4 more categories for Board 1
  ],
];
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `[` | Go to the previous board |
| `]` | Go to the next board |
| Hover + `C` | Uncomplete a completed question |
| Click | Open a question |
| `Space` (question active) | Cycle from question → answer |
| `T` (question text displayed) | Toggle the timer |

## ➕ How to Add a New Board

To add an extra board to the game:

1. Add 5 category names to `CATEGORIES`:

```typescript
export const CATEGORIES: string[][] = [
  ["Movie Quotes", "Corporate", "Palindromes", "Politics", "Afzal"], // Board 1
  ["Empires", "Words in 'Inbreads'", "Before and After", "Doctor", "Complexity"], // Board 2
  ["Geography", "Gaming", "80s Music", "Science", "Food"], // Board 3 (NEW)
];
```

2. Add a matching 3rd array to `QUESTIONS`:

```typescript
export const QUESTIONS: Question[][][] = [
  [ /* Board 1 Questions */ ],
  [ /* Board 2 Questions */ ],
  [ /* Board 3 Questions (NEW) */
    [ /* 5 questions for Geography */ ],
    [ /* 5 questions for Gaming */ ],
    [ /* 5 questions for 80s Music */ ],
    [ /* 5 questions for Science */ ],
    [ /* 5 questions for Food */ ],
  ],
];
```
