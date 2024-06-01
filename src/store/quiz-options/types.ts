export const QuizCategory = ['Category 1', 'Category 2', 'Category 3'] as const;
export type QuizCategory = (typeof QuizCategory)[number];

export const QuizDifficulty = ['Easy', 'Medium', 'Hard'] as const;
export type QuizDifficulty = (typeof QuizDifficulty)[number];

export const QuizType = ['Type 1', 'Type 2', 'Type 3'] as const;
export type QuizType = (typeof QuizType)[number];

export const QuizTime = [1, 2, 5];
export type QuizTime = (typeof QuizTime)[number];

export type QuestionCount = number;

export type QuizOptions = {
  category: QuizCategory;
  difficulty: QuizDifficulty;
  type: QuizType;
  time: QuizTime;
  questionCount: QuestionCount;
};
