import { expect, test } from 'vitest';
import { AnswerQuestionUseCase } from './answaer-question';

test('should create an answer', () => {
  const answerQuestion = new AnswerQuestionUseCase();

  const answaer = answerQuestion.execute({ questionId: '1', instructorId: '1', content: 'Nova resposta' });

  expect(answaer.content).toEqual('Nova resposta');
});
