import { Button, Container, Select, Space, Stack } from '@mantine/core';
import { useCallback, useState } from 'react';
import { ScreenStack, ScreenTitle, ValidatedNumberInput, ValueSelect } from '../components';
import { isA, isInRange } from '../helpers';
import {
  MAX_QUESTION_COUNT,
  MIN_QUESTION_COUNT,
  QuizCategory,
  QuizDifficulty,
  QuizTime,
  QuizType,
} from '../store';
import { Nullable } from '../types';

const getQuizTimeSelectLabel = (min: number) => `${min}m`;
const timeValues = QuizTime.map(value => ({ value, label: getQuizTimeSelectLabel(value) }));

export default function StartMenuScreen() {
  const {
    onChangeCategory,
    onChangeDifficulty,
    onChangeQuestionCount,
    onChangeTime,
    onChangeType,
    areOptionsValid,
    category,
    difficulty,
    questionCount,
    time,
    type,
  } = useStartMenuQuizOptions();

  return (
    <Container size="xs">
      <ScreenStack>
        <ScreenTitle>Quiz Start Options</ScreenTitle>
        <Stack>
          <ValidatedNumberInput
            value={questionCount}
            onChange={onChangeQuestionCount}
            label={`Questions count (from ${MIN_QUESTION_COUNT} to ${MAX_QUESTION_COUNT})`}
            min={MIN_QUESTION_COUNT}
            max={MAX_QUESTION_COUNT}
          />
          <Select
            data={QuizCategory}
            label="Category"
            onChange={onChangeCategory}
            value={category}
          />
          <Select
            data={QuizDifficulty}
            label="Difficulty"
            onChange={onChangeDifficulty}
            value={difficulty}
          />
          <Select label="Type" data={QuizType} value={type} onChange={onChangeType} />
          <ValueSelect<number>
            label="Time"
            onChange={onChangeTime}
            value={time}
            values={timeValues}
          />
          <Space h="md" />
          <Button disabled={!areOptionsValid}>Start Quiz</Button>
          <Button variant="outline">See my stats</Button>
        </Stack>
      </ScreenStack>
    </Container>
  );
}

function useStartMenuQuizOptions() {
  const [category, setCategory] = useState<QuizCategory>('Category 1');
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('Easy');
  const [type, setType] = useState<QuizType>('Type 1');
  const [questionCount, setQuestionCount] = useState<Nullable<number>>(MIN_QUESTION_COUNT);
  const [time, setTime] = useState<number>(QuizTime[0]);

  const areOptionsValid = Boolean(
    category &&
      difficulty &&
      type &&
      typeof questionCount == 'number' &&
      isInRange(questionCount, MIN_QUESTION_COUNT, MAX_QUESTION_COUNT),
  );

  const onChangeQuestionCount = useCallback((questionCount: Nullable<number>) => {
    setQuestionCount(questionCount);
  }, []);

  const onChangeCategory = useCallback((category: Nullable<string>) => {
    if (category && isA(category, QuizCategory)) setCategory(category);
  }, []);

  const onChangeDifficulty = useCallback((difficulty: Nullable<string>) => {
    if (difficulty && isA(difficulty, QuizDifficulty)) setDifficulty(difficulty);
  }, []);

  const onChangeType = useCallback((type: Nullable<string>) => {
    if (type && isA(type, QuizType)) setType(type);
  }, []);

  const onChangeTime = useCallback((time: Nullable<number>) => {
    if (time && isA(time, QuizTime)) setTime(time);
  }, []);

  return {
    areOptionsValid,
    onChangeCategory,
    onChangeDifficulty,
    onChangeQuestionCount,
    onChangeTime,
    onChangeType,
    category,
    difficulty,
    type,
    time,
    questionCount,
  };
}
