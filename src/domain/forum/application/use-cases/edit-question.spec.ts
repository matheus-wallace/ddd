import { EditQuestionUseCase } from './edit-question'

import { makeQuestion } from 'test/factories/make-question'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repositories copy'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository

let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to Edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },

      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-1',
      title: 'question test',
      content: 'content test',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'question test',
      content: 'content test',
    })
  })

  it('should not be able to Edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },

      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(() => {
      return sut.execute({
        questionId: newQuestion.id.toValue(),
        authorId: 'author-2',
        title: 'question test',
        content: 'content test',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
