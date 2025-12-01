import { UniqueEntityID } from '../../core/entities/unique-entity-id';
import { Answer } from '../entities/answer';

interface AnswerQuestionUseCaseRequest {
  instructorId: UniqueEntityID;
  questionId: UniqueEntityID;
  content: string;
}

export class AnswerQuestionUseCase {
  execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId,
      createdAt: new Date()
    });

    return answer;
  }
}
