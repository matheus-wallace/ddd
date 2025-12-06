import { Slug } from './slug'

test('should create a slug from text', () => {
  const slug = Slug.createFromText('Example question title')
  expect(slug.value).toBe('example-question-title')
})
